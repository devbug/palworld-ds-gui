package main

import (
	"encoding/json"
	"palworld-ds-gui-server/utils"

	"github.com/gorilla/websocket"
)

var readConfigEvent = "READ_CONFIG"

func ReadConfigHandler(conn *websocket.Conn, data []byte) {
	var message BaseRequest

	err := json.Unmarshal(data, &message)
	if err != nil {
		utils.Log(err.Error())
		SafeWriteJSON(conn, BaseResponse{
			Event:   readConfigEvent,
			EventId: message.EventId,
			Success: false,
		})
		return
	}

	SafeWriteJSON(conn, SimpleResponse{
		BaseResponse: BaseResponse{
			Event:   readConfigEvent,
			EventId: message.EventId,
			Success: true,
		},
		Data: ReadConfig(),
	})
}
