package main

import (
	"encoding/json"
	"palworld-ds-gui-server/utils"

	"github.com/gorilla/websocket"
)

var writeSaveEvent = "WRITE_SAVE_NAME"

func WriteSaveHandler(conn *websocket.Conn, data []byte) {
	var message WriteSaveRequest

	err := json.Unmarshal(data, &message)
	if err != nil {
		utils.Log(err.Error())
		SafeWriteJSON(conn, BaseResponse{
			Event:   writeSaveEvent,
			EventId: message.EventId,
			Success: false,
		})
		return
	}

	err = WriteSaveName(message.Data.NewSaveName)
	if err != nil {
		utils.Log(err.Error())
		SafeWriteJSON(conn, BaseResponse{
			Event:   writeSaveEvent,
			EventId: message.EventId,
			Success: false,
		})
		return
	}

	// this response is just to flag the client that the write was successful
	// the emit below will send the new save name to all clients
	SafeWriteJSON(conn, BaseResponse{
		Event:   writeSaveEvent,
		EventId: message.EventId,
		Success: true,
	})

	EmitSaveName(message.Data.NewSaveName, nil)
}
