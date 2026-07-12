package main

import (
	"encoding/json"
	"palworld-ds-gui-server/utils"

	"github.com/gorilla/websocket"
)

var startBackupsEvent = "START_BACKUPS"

func StartBackupsHandler(conn *websocket.Conn, data []byte) {
	var message StartBackupsRequest

	err := json.Unmarshal(data, &message)
	if err != nil {
		utils.Log(err.Error())
		SafeWriteJSON(conn, BaseResponse{
			Event:   startBackupsEvent,
			EventId: message.EventId,
			Success: false,
		})
		return
	}

	backupmanager.Start(message.Data.Interval, message.Data.KeepCount)

	SafeWriteJSON(conn, BaseResponse{
		Event:   startBackupsEvent,
		EventId: message.EventId,
		Success: true,
	})

	EmitBackupSettings(nil)
}
