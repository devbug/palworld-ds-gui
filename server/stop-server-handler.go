package main

import (
	"encoding/json"
	"fmt"
	"palworld-ds-gui-server/utils"
	"time"

	"github.com/gorilla/websocket"
)

var stopServerEvent = "STOP_SERVER"

func StopServerHandler(conn *websocket.Conn, data []byte) {
	EmitServerStatus("STOPPING", nil)

	var message BaseRequest
	err := json.Unmarshal(data, &message)
	if err != nil {
		utils.Log(err.Error())
		conn.WriteJSON(BaseResponse{
			Event:   stopServerEvent,
			EventId: message.EventId,
			Success: false,
		})
		return
	}

	if utils.Settings.StopCountdown.Enabled {
		countdown := utils.Settings.StopCountdown.Startat
		// announce
		servermanager.SendAnnounce(fmt.Sprintf("%d초 뒤에 서버가 종료됩니다. 안전한 곳으로 이동해주세요.", countdown))
		for countdown--; countdown > 0; countdown-- {
			if countdown < 10 {
				// 매번
				servermanager.SendAnnounce(fmt.Sprintf("%d초 뒤에 서버가 종료됩니다. 안전한 곳에 캐릭터를 위치해주세요.", countdown))
			} else if countdown >= 10 && countdown < 30 && countdown%10 == 0 {
				// 10초마다
				servermanager.SendAnnounce(fmt.Sprintf("%d초 뒤에 서버가 종료됩니다. 안전한 곳으로 이동해주세요.", countdown))
			} else if countdown%30 == 0 {
				// 30초마다
				servermanager.SendAnnounce(fmt.Sprintf("%d초 뒤에 서버가 종료됩니다. 안전한 곳으로 이동해주세요.", countdown))
			}
			time.Sleep(1 * time.Second)
		}
	}

	err = servermanager.Stop()

	if err != nil {
		utils.Log(err.Error())
		EmitServerStatus("ERROR", nil)
	} else {
		EmitServerStatus("STOPPED", nil)
	}
}
