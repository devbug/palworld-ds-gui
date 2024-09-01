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
	"runtime"
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
	if _, err := os.Stat(utils.Config.ServerExe); os.IsNotExist(err) {
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
	scanner := bufio.NewScanner(*stream)
	for scanner.Scan() {
		m := scanner.Text()
		if strings.Contains(m, "[LOG] REST") {
			utils.LogToFile(m, false)
		} else {
			utils.Log(m)
		}

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
			s.SendAnnounce(fmt.Sprintf("%v(%v)은/는 핵을 사용 중인 것으로 의심됩니다!", cheater_name, user_id))
		}
		// if strings.Contains(m, "joined the server") {
		// 	s.SendAnnounce(m)
		// }
		// if strings.Contains(m, "left the server") {
		// 	s.SendAnnounce(m)
		// }
	}
}

func (s *ServerManager) SendAnnounce(msg string) error {
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
		return nil
	}

	if len(adminPassword) == 0 /*|| len(restapiPort) == 0*/ {
		utils.Log(fmt.Sprintf("server config parse failed: %v || %v", adminPassword, restapiPort))
	} else {
		if len(restapiPort) == 0 {
			restapiPort = "8212"
		}

		client := resty.New()
		client.SetDisableWarn(true)
		client.SetBaseURL(fmt.Sprintf("http://127.0.0.1:%v", restapiPort))
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
	if runtime.GOOS == "windows" {
		launchParamsSlice = append(launchParamsSlice, "")
		copy(launchParamsSlice[1:], launchParamsSlice[0:])
		launchParamsSlice[0] = "Pal"
	}

	s.serverCmd = exec.Command(utils.Config.ServerExe, launchParamsSlice...)
	s.serverCmd.Dir = utils.Config.ServerPath
	// s.serverCmd.Stdout = os.Stdout
	// s.serverCmd.Stderr = os.Stderr

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

	return nil
}

func (s *ServerManager) Stop() error {
	if !s.IsRunning() {
		return nil
	}

	utils.Log("Stopping dedicated server...")

	err := utils.KillProcessByPid(s.serverPid)
	if err != nil && s.serverCmd != nil && s.serverCmd.Process != nil {
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
