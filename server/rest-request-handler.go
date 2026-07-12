package main

import (
	"encoding/json"
	"fmt"
	"palworld-ds-gui-server/utils"

	"github.com/gorilla/websocket"
)

var restRequestEvent = "REST_REQUEST"

func RestRequestHandler(conn *websocket.Conn, data []byte) {
	var message RestApiRequest

	err := json.Unmarshal(data, &message)
	if err != nil {
		utils.Log(err.Error())
		SafeWriteJSON(conn, BaseResponse{
			Event:   restRequestEvent,
			EventId: message.EventId,
			Success: false,
			Error:   err.Error(),
		})
		return
	}

	// REST 호출이 느리거나 멈춰도 WebSocket 읽기 루프가 막히지 않도록
	// 별도 고루틴에서 처리한다.
	go func() {
		defer func() {
			if r := recover(); r != nil {
				utils.LogToFile(fmt.Sprintf("REST handler panic: %v", r), true)
			}
		}()

		result, err := CallGameRestApi(message.Data.Endpoint, message.Data.Body)
		if err != nil {
			utils.Log(fmt.Sprintf("REST %s failed: %s", message.Data.Endpoint, err.Error()))
			SafeWriteJSON(conn, BaseResponse{
				Event:   restRequestEvent,
				EventId: message.EventId,
				Success: false,
				Error:   err.Error(),
			})
			return
		}

		SafeWriteJSON(conn, SimpleResponse{
			BaseResponse: BaseResponse{
				Event:   restRequestEvent,
				EventId: message.EventId,
				Success: true,
			},
			Data: result,
		})
	}()
}
