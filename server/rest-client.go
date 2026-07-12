package main

import (
	"encoding/json"
	"fmt"
	"regexp"
	"strings"
	"time"

	"github.com/go-resty/resty/v2"
)

// 게임 서버가 응답하지 않을 때 무한 대기하지 않도록 하는 제한 시간.
// 프론트엔드의 요청 타임아웃(10초)보다 짧아야 에러가 정상 전달된다.
// 테스트에서 짧게 조정할 수 있도록 var로 둔다.
var restApiTimeout = 5 * time.Second

// 게임 서버 REST API로 중계를 허용하는 엔드포인트와 HTTP 메서드.
// 클라이언트가 임의의 경로를 호출하지 못하도록 GUI가 실제로 사용하는
// 엔드포인트만 화이트리스트로 허용한다.
var allowedRestEndpoints = map[string]string{
	"info":     "GET",
	"players":  "GET",
	"announce": "POST",
	"kick":     "POST",
	"ban":      "POST",
	"save":     "POST",
}

type restApiConfig struct {
	AdminPassword string
	Port          string
	Enabled       bool
}

// PalWorldSettings.ini에서 REST API 접속 정보를 추출한다.
func getRestApiConfig() restApiConfig {
	return parseRestApiConfig(ReadConfig())
}

func parseRestApiConfig(currentConfigStr string) restApiConfig {
	config := restApiConfig{Port: "8212", Enabled: true}

	if match := regexp.MustCompile(`AdminPassword="([^"]+)"`).FindStringSubmatch(currentConfigStr); len(match) == 2 {
		config.AdminPassword = match[1]
	}

	if match := regexp.MustCompile(`RESTAPIPort=([0-9]+)`).FindStringSubmatch(currentConfigStr); len(match) == 2 {
		config.Port = match[1]
	}

	if match := regexp.MustCompile(`RESTAPIEnabled=([A-Za-z]+)`).FindStringSubmatch(currentConfigStr); len(match) == 2 {
		config.Enabled = !strings.EqualFold(match[1], "false")
	}

	return config
}

// CallGameRestApi는 로컬 게임 서버의 REST API(v1/api/<endpoint>)를 호출하고
// 응답 본문을 그대로 반환한다.
func CallGameRestApi(endpoint string, body string) (string, error) {
	return callGameRestApiWithConfig(getRestApiConfig(), endpoint, body)
}

func callGameRestApiWithConfig(config restApiConfig, endpoint string, body string) (string, error) {
	method, ok := allowedRestEndpoints[endpoint]
	if !ok {
		return "", fmt.Errorf("endpoint not allowed: %s", endpoint)
	}

	if !config.Enabled {
		return "", fmt.Errorf("REST API is disabled in the server settings (RESTAPIEnabled=False)")
	}

	if config.AdminPassword == "" {
		return "", fmt.Errorf("AdminPassword is not set in the server settings")
	}

	client := resty.New()
	client.SetDisableWarn(true)
	client.SetTimeout(restApiTimeout)
	client.SetBaseURL(fmt.Sprintf("http://127.0.0.1:%s", config.Port))
	client.SetBasicAuth("admin", config.AdminPassword)

	request := client.R().SetHeader("Accept", "application/json")

	var resp *resty.Response
	var err error

	if method == "GET" {
		resp, err = request.Get("v1/api/" + endpoint)
	} else {
		if body != "" {
			request.SetHeader("Content-Type", "application/json").SetBody(body)
		}
		resp, err = request.Post("v1/api/" + endpoint)
	}

	if err != nil {
		return "", err
	}

	if resp.StatusCode() != 200 {
		return string(resp.Body()), fmt.Errorf("REST API returned status %s", resp.Status())
	}

	return string(resp.Body()), nil
}

// CallGameRestApiJSON은 body를 JSON으로 직렬화해 호출한다.
func CallGameRestApiJSON(endpoint string, payload interface{}) (string, error) {
	body, err := json.Marshal(payload)
	if err != nil {
		return "", err
	}

	return CallGameRestApi(endpoint, string(body))
}
