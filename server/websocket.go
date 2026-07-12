package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"palworld-ds-gui-server/utils"
	"strings"
	"sync"
	"time"

	"github.com/gorilla/websocket"
)

var (
	upgrader = websocket.Upgrader{
		ReadBufferSize:  1024,
		WriteBufferSize: 1024,
		CheckOrigin:     func(r *http.Request) bool { return true },
	}
	clients       = make(map[*websocket.Conn]bool)
	mutex         = &sync.Mutex{}
	writeMutex    = &sync.Mutex{}
	eventHandlers = map[string]func(*websocket.Conn, []byte){
		startServerEvent:            StartServerHandler,
		stopServerEvent:             StopServerHandler,
		restartServerEvent:          RestartServerHandler,
		readConfigEvent:             ReadConfigHandler,
		readSaveEvent:               ReadSaveHandler,
		writeSaveEvent:              WriteSaveHandler,
		writeConfigEvent:            WriteConfigHandler,
		clientInitEvent:             ClientInitHandler,
		updateServerEvent:           UpdateServerHandler,
		startBackupsEvent:           StartBackupsHandler,
		stopBackupsEvent:            StopBackupsHandler,
		createBackupEvent:           CreateBackupHandler,
		getBackupsEvent:             GetBackupsHandler,
		deleteBackupEvent:           DeleteBackupHandler,
		restoreBackupEvent:          RestoreBackupHandler,
		getBackupsConfigEvent:       GetBackupsConfigHandler,
		saveLaunchParamsEvent:       SaveLaunchParamsHandler,
		getSteamAvatarEvent:         GetSteamAvatarHandler,
		rconExecHandlerEvent:        RconExecHandlerHandler,
		restRequestEvent:            RestRequestHandler,
		saveAdditionalSettingsEvent: SaveAdditionalSettingsHandler,
	}
)

// 응답을 받지 않는 클라이언트(비정상 종료 등) 때문에 쓰기가 영원히
// 막히지 않도록 하는 제한 시간.
const websocketWriteTimeout = 10 * time.Second

// gorilla/websocket은 하나의 연결에 대한 동시 쓰기를 허용하지 않는다
// (동시에 쓰면 패닉으로 프로세스 전체가 종료됨). 핸들러 응답, 콘솔 로그
// 브로드캐스트, REST 고루틴 등 여러 고루틴이 쓰기를 수행하므로
// 모든 쓰기를 전역 뮤텍스로 직렬화한다.
func SafeWriteJSON(conn *websocket.Conn, v interface{}) error {
	writeMutex.Lock()
	defer writeMutex.Unlock()

	conn.SetWriteDeadline(time.Now().Add(websocketWriteTimeout))

	return conn.WriteJSON(v)
}

// 핸들러에서 패닉이 발생해도 GUI 서버 프로세스가 죽지 않도록 복구한다.
func safeHandle(handler func(*websocket.Conn, []byte), conn *websocket.Conn, payload []byte, event string) {
	defer func() {
		if r := recover(); r != nil {
			utils.LogToFile(fmt.Sprintf("Handler panic for event %s: %v", event, r), true)
		}
	}()

	handler(conn, payload)
}

func handleWebSocket(w http.ResponseWriter, r *http.Request) {
	authToken := r.URL.Query().Get("auth")

	if authToken != utils.Settings.General.APIKey {
		utils.Log(fmt.Sprintf("Unauthorized connection attempt from %s", r.RemoteAddr))
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		utils.LogToFile(err.Error(), true)
		return
	}

	mutex.Lock()
	clients[conn] = true
	mutex.Unlock()

	defer func() {
		mutex.Lock()
		delete(clients, conn)
		mutex.Unlock()
		conn.Close()
		utils.Log(fmt.Sprintf("%s disconnected from the GUI server", conn.RemoteAddr().String()))
	}()

	utils.Log(fmt.Sprintf("%s connected to the GUI server", conn.RemoteAddr().String()))

	for {
		messageType, p, err := conn.ReadMessage()
		if err != nil {
			utils.LogToFile(err.Error(), true)
			break
		}

		if messageType != websocket.TextMessage {
			utils.LogToFile("Received non-text message", true)
			continue
		}

		var message BaseRequest
		err = json.Unmarshal(p, &message)
		if err != nil {
			utils.LogToFile(err.Error(), true)
			continue
		}

		if handler, ok := eventHandlers[message.Event]; ok {
			safeHandle(handler, conn, p, message.Event)
		} else {
			utils.LogToFile(fmt.Sprintf("Unknown event: %s", message.Event), true)
			// 미지의 이벤트도 응답을 보내 클라이언트가 타임아웃까지
			// 기다리지 않고 즉시 실패를 알 수 있게 한다.
			SafeWriteJSON(conn, BaseResponse{
				Event:   message.Event,
				EventId: message.EventId,
				Success: false,
				Error:   fmt.Sprintf("Unknown event: %s (server version mismatch?)", message.Event),
			})
		}
	}
}

func BroadcastJSON(v interface{}, exclude *websocket.Conn) {
	// 쓰기 도중 mutex를 잡고 있으면 느린 클라이언트 하나가 신규 접속 등록까지
	// 막을 수 있으므로, 대상 목록만 잠금 안에서 복사하고 쓰기는 잠금 밖에서 한다.
	mutex.Lock()
	targets := make([]*websocket.Conn, 0, len(clients))
	for client := range clients {
		if client != exclude {
			targets = append(targets, client)
		}
	}
	mutex.Unlock()

	for _, client := range targets {
		err := SafeWriteJSON(client, v)
		if err != nil {
			// 주의: 여기서 utils.Log를 쓰면 EmitConsoleLog → BroadcastJSON으로
			// 재귀 호출되어 데드락이 발생한다. 반드시 파일 로그만 남길 것.
			utils.LogToFile(fmt.Sprintf("Broadcast write failed, dropping client: %s", err.Error()), true)
			client.Close()

			mutex.Lock()
			delete(clients, client)
			mutex.Unlock()
		}
	}
}

func EmitServerStatus(status string, exclude *websocket.Conn) {
	BroadcastJSON(SimpleResponse{
		BaseResponse: BaseResponse{
			Event:   "SERVER_STATUS_CHANGED",
			Success: true,
		},
		Data: status,
	}, exclude)
}

func EmitServerConfig(config string, exclude *websocket.Conn) {
	BroadcastJSON(SimpleResponse{
		BaseResponse: BaseResponse{
			Event:   "SERVER_CONFIG_CHANGED",
			Success: true,
		},
		Data: config,
	}, exclude)
}

func EmitBackupSettings(exclude *websocket.Conn) {
	BroadcastJSON(BackupSettingsResponse{
		BaseResponse: BaseResponse{
			Event:   "BACKUP_SETTINGS_CHANGED",
			Success: true,
		},
		Data: utils.Settings.Backup,
	}, exclude)
}

func EmitAdditionalSettings(exclude *websocket.Conn) {
	BroadcastJSON(TimedRestartSettingsResponse{
		BaseResponse: BaseResponse{
			Event:   "ADDITIONAL_SETTINGS_CHANGED",
			Success: true,
		},
		Data: AdditionalSettings{utils.Settings.TimedRestart, utils.Settings.RestartOnCrash, utils.Settings.StopCountdown},
	}, exclude)
}

func EmitSaveName(name string, exclude *websocket.Conn) {
	BroadcastJSON(SimpleResponse{
		BaseResponse: BaseResponse{
			Event:   "SERVER_SAVE_NAME_CHANGED",
			Success: true,
		},
		Data: name,
	}, exclude)
}

func EmitLaunchParams(exclude *websocket.Conn) {
	BroadcastJSON(SimpleResponse{
		BaseResponse: BaseResponse{
			Event:   "LAUNCH_PARAMS_CHANGED",
			Success: true,
		},
		Data: utils.Settings.General.LaunchParams,
	}, exclude)
}

func LogToClient(message string, conn *websocket.Conn) {
	BroadcastJSON(SimpleResponse{
		BaseResponse: BaseResponse{
			Event:   "ADD_CONSOLE_ENTRY",
			Success: true,
		},
		Data: strings.TrimSpace(message),
	}, conn)
}
