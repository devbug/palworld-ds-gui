package main

import (
	"bufio"
	"errors"
	"fmt"
	"io"
	"os"
	"os/exec"
	"palworld-ds-gui-server/utils"
	"regexp"
	"strings"
	"time"

	"github.com/go-resty/resty/v2"
	"github.com/mitchellh/go-ps"
)

type ServerManager struct {
	cmd       *exec.Cmd
	serverCmd *exec.Cmd
	serverPid int
}

func NewServerManager() *ServerManager {
	return &ServerManager{}
}

func (s *ServerManager) Init() {
	proc, _ := utils.FindProcessByName(utils.Config.ServerProcessName)

	if proc != nil {
		utils.Log("A server is already running, killing it...")

		err := utils.KillProcessByPid(proc.Pid())

		if err != nil {
			utils.Log("Error stopping server: " + err.Error())
			return
		}

		utils.Log("Server killed successfully")
	}

	if _, err := os.Stat(utils.Config.ServerPath); os.IsNotExist(err) {
		utils.Log("Server directory not found, creating...")
		utils.Log("If you already have a server, please place it in " + utils.Config.ServerPath)
		os.Mkdir(utils.Config.ServerPath, 0755)
		s.DownloadDedicatedServer()
	}
}

func (s *ServerManager) DownloadDedicatedServer() error {
	utils.Log("Downloading dedicated server...")

	if s.IsRunning() {
		utils.Log("Cannot update server while it's running. Stopping it...")
		s.Stop()
	}

	cmd := exec.Command(utils.Config.SteamCmdExe,
		"+force_install_dir", utils.Config.ServerPath,
		"+login", "anonymous",
		"+app_update", utils.Config.AppId, "validate",
		"+quit")

	cmd.Dir = utils.Config.SteamCmdPath
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	s.cmd = cmd

	err := cmd.Run()
	if err != nil {
		return err
	}

	utils.Log("Server downloaded and updated successfully!")

	return nil
}

func (s *ServerManager) IsRunning() bool {
	if s.serverPid == 0 {
		return false
	}

	proc, _ := utils.FindProcessByPid(s.serverPid)

	return proc != nil
}

func (s *ServerManager) MonitorServerProcess() {
	for {
		time.Sleep(4 * time.Second)

		// was killed via gui
		if s.serverPid == 0 {
			break
		}

		proc, err := utils.FindProcessByPid(s.serverPid)

		if proc == nil || err != nil {
			utils.Log("Server seems to have stopped (crashed?)")
			EmitServerStatus("STOPPED", nil)

			if utils.Settings.RestartOnCrash.Enabled {
				utils.Log("Restart on crash is enabled, attempting to restart...")

				err := s.Start()
				if err == nil {
					EmitServerStatus("STARTED", nil)
				}
			}

			break
		}
	}
}

func (s *ServerManager) handleStdStream(stream *io.ReadCloser) {
	currentConfigStr := ReadConfig()
	var adminPassword, restapiPort string
	{
		re := regexp.MustCompile(`AdminPassword="([^\s,]+)"`)
		match := re.FindStringSubmatch(currentConfigStr)
		if len(match) == 2 {
			adminPassword = match[1]
		}
	}
	{
		re := regexp.MustCompile(`RESTAPIPort=([^\s,]+)`)
		match := re.FindStringSubmatch(currentConfigStr)
		if len(match) == 2 {
			restapiPort = match[1]
		}
	}

	scanner := bufio.NewScanner(*stream)
	for scanner.Scan() {
		m := scanner.Text()
		utils.Log(m)

		if strings.Contains(m, "cheater!") {
			var cheater_name, user_id string
			{
				re := regexp.MustCompile(`\[([0-9]+)\] ([^\s]+) .* cheater!`)
				match := re.FindStringSubmatch(m)
				if len(match) == 3 {
					user_id = match[1]
					cheater_name = match[2]
				}
			}
			s.sendAnnounce(adminPassword, restapiPort, fmt.Sprintf("%v(%v)은/는 핵을 사용 중인 것으로 의심됩니다!", cheater_name, user_id))
		}
		// if strings.Contains(m, "joined the server") {
		// 	s.sendAnnounce(adminPassword, restapiPort, m)
		// }
		// if strings.Contains(m, "left the server") {
		// 	s.sendAnnounce(adminPassword, restapiPort, m)
		// }
	}
	// reader := bufio.NewReader(*stream)
	// for {
	// 	line, err := reader.ReadString('\n')
	// 	if len(line) == 0 && err != nil {
	// 		if err == io.EOF {
	// 			break
	// 		}
	// 		return
	// 	}

	// 	if len(strings.TrimSpace(line)) != 0 {
	// 		fmt.Print(line)
	// 	}

	// 	if err != nil {
	// 		if err == io.EOF {
	// 			break
	// 		}
	// 		return
	// 	}
	// }
}

func (s *ServerManager) sendAnnounce(adminPassword, port string, msg string) error {
	if len(adminPassword) == 0 /*|| len(restapiPort) == 0*/ {
		utils.Log(fmt.Sprintf("server config parse failed: %v || %v", adminPassword, port))
	} else {
		if len(port) == 0 {
			port = "8212"
		}

		client := resty.New()
		client.SetBaseURL(fmt.Sprintf("http://127.0.0.1:%v", port))
		client.SetBasicAuth("admin", adminPassword)
		client.SetHeader("Accept", "application/json")

		resp, err := client.R().
			SetBody(`{ "message": "` + msg + `" }`).
			Post("v1/api/announce")
		if resp.StatusCode() != 200 || err != nil {
			utils.Log(fmt.Sprint("announce REST API failed: ", resp.Status(), err))
		}

		return err
	}

	return nil
}

func (s *ServerManager) Start() error {
	utils.Log("Starting dedicated server...")

	launchParamsSlice := strings.Split(utils.Settings.General.LaunchParams, " ")

	s.serverCmd = exec.Command(utils.Config.ServerExe, launchParamsSlice...)
	s.serverCmd.Dir = utils.Config.ServerPath
	// s.serverCmd.Stdout = os.Stdout
	// s.serverCmd.Stderr = os.Stderr

	// var buf bytes.Buffer
	// multi := io.MultiWriter(os.Stdout, &buf)
	// s.serverCmd.Stdout = multi

	// go func() {
	// 	scanner := bufio.NewScanner(&buf)
	// 	for scanner.Scan() {
	// 		utils.Log(scanner.Text())
	// 	}
	// }()

	stdout, err := s.serverCmd.StdoutPipe()
	if err != nil {
		return err
	}

	stderr, err := s.serverCmd.StderrPipe()
	if err != nil {
		return err
	}

	err = s.serverCmd.Start()
	if err != nil {
		return err
	}

	go s.handleStdStream(&stdout)
	go s.handleStdStream(&stderr)

	var attempts int = 10
	var proc ps.Process

	whileLoop := true
	for whileLoop {
		time.Sleep(1 * time.Second)

		proc, err = utils.FindProcessByName(utils.Config.ServerProcessName)
		if err != nil {
			continue
		}

		if proc != nil {
			whileLoop = false
		}

		attempts--

		if attempts <= 0 {
			whileLoop = false
		}
	}

	if proc == nil {
		return errors.New("server process not found")
	}

	s.serverPid = proc.Pid()
	utils.Log("Server started")

	go s.MonitorServerProcess()

	go func() {
		type Player struct {
			Name        string  `json:"name"`
			AccountName string  `json:"accountName"`
			PlayerId    string  `json:"playerId"`
			UserId      string  `json:"userId"`
			IP          string  `json:"ip"`
			Ping        float64 `json:"ping"`
			Location_X  float64 `json:"location_x"`
			Location_Y  float64 `json:"location_y"`
			Level       int     `json:"level"`
		}
		type Players struct {
			Players []Player `json:"players"`
		}

		var players []Player

		for s.IsRunning() {
			currentConfigStr := ReadConfig()
			var adminPassword, restapiPort, restapiEnabled string
			{
				re := regexp.MustCompile(`AdminPassword="([^\s,]+)"`)
				match := re.FindStringSubmatch(currentConfigStr)
				if len(match) == 2 {
					adminPassword = match[1]
				}
			}
			{
				re := regexp.MustCompile(`RESTAPIPort=([^\s,]+)`)
				match := re.FindStringSubmatch(currentConfigStr)
				if len(match) == 2 {
					restapiPort = match[1]
				}
			}
			{
				re := regexp.MustCompile(`RESTAPIEnabled=([^\s,]+)`)
				match := re.FindStringSubmatch(currentConfigStr)
				if len(match) == 2 {
					restapiEnabled = match[1]
				}
			}

			if strings.EqualFold(restapiEnabled, "false") {
				utils.Log("[WARNING] REST API disabled")
				return
			}

			if len(adminPassword) == 0 /*|| len(restapiPort) == 0*/ {
				utils.Log(fmt.Sprintf("server config parse failed: %v || %v", adminPassword, restapiPort))
			} else {
				if len(restapiPort) == 0 {
					restapiPort = "8212"
				}

				var curr_players Players

				client := resty.New()
				client.SetBaseURL(fmt.Sprintf("http://127.0.0.1:%v", restapiPort))
				client.SetBasicAuth("admin", adminPassword)
				client.SetHeader("Accept", "application/json")
				resp, err := client.R().SetResult(&curr_players).Get("v1/api/players")

				if resp.StatusCode() == 200 && err == nil {
					// utils.Log(fmt.Sprintf("players: %v, %v", curr_players, resp))
					// err := json.Unmarshal(resp.Body(), &curr_players)
					// if err != nil {
					// 	utils.Log(fmt.Sprintf("%v is json?", string(resp.Body())))
					// }
					// utils.Log(fmt.Sprintf("unmarshaled players: %v", curr_players))
					find := false
					for _, player := range curr_players.Players {
						for _, p := range players {
							if player.UserId == p.UserId && player.PlayerId == p.PlayerId {
								find = true
								break
							}
						}
						if !find && player.PlayerId != "None" {
							utils.Log(fmt.Sprintf("new player: %v", player))
							resp, err := client.R().
								SetBody(`{ "message": "` + player.Name + ` 님이 입장하셨습니다." }`).
								Post("v1/api/announce")
							if resp.StatusCode() != 200 || err != nil {
								utils.Log(fmt.Sprint("announce REST API failed: ", resp.Status(), err))
							}
						}
					}
					find = false
					for _, player := range players {
						for _, p := range curr_players.Players {
							if player.UserId == p.UserId {
								find = true
								break
							}
						}
						if !find {
							utils.Log(fmt.Sprintf("exit player: %v", player))
							resp, err := client.R().
								SetBody(`{ "message": "` + player.Name + ` 님이 퇴장하셨습니다." }`).
								Post("v1/api/announce")
							if resp.StatusCode() != 200 || err != nil {
								utils.Log(fmt.Sprint("announce REST API failed: ", resp.Status(), err))
							}
						}
					}
					players = append([]Player{}, curr_players.Players...)
				} else {
					utils.Log(fmt.Sprintf("REST API failed: %s, %v", resp.Status(), err))
				}
			}

			time.Sleep(time.Second * 5)
		}
	}()

	return nil
}

func (s *ServerManager) Stop() error {
	if !s.IsRunning() {
		return nil
	}

	utils.Log("Stopping dedicated server...")

	err := utils.KillProcessByPid(s.serverPid)
	if err != nil {
		return err
	}

	if s.serverCmd != nil && s.serverCmd.Process != nil {
		err := s.serverCmd.Process.Kill()
		if err != nil {
			return err
		}
	}

	utils.Log("Server stopped")
	s.serverPid = 0

	return nil
}

func (s *ServerManager) Restart() error {
	utils.Log("Restarting dedicated server...")

	err := s.Stop()
	if err != nil {
		return err
	}

	err = s.Start()
	if err != nil {
		return err
	}

	return nil
}

func (s *ServerManager) Update() error {
	err := s.DownloadDedicatedServer()
	if err != nil {
		return err
	}

	return nil
}

func (s *ServerManager) Dispose() {
	if s.cmd != nil && s.cmd.Process != nil {
		err := s.cmd.Process.Kill()
		if err != nil {
			utils.Log(err.Error())
		}
	}

	s.Stop()
	utils.Log("dedicated-server.go: Dispose()")
}
