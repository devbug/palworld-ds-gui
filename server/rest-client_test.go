package main

import (
	"encoding/json"
	"io"
	"net/http"
	"net/http/httptest"
	"net/url"
	"strings"
	"testing"
	"time"
)

const testConfigStr = `[/Script/Pal.PalGameWorldSettings]
OptionSettings=(ServerName="test",AdminPassword="secret-pass",RCONEnabled=False,RCONPort=25575,RESTAPIEnabled=True,RESTAPIPort=%PORT%,CrossplayPlatforms=(Steam,Xbox,PS5,Mac))`

func TestParseRestApiConfig(t *testing.T) {
	config := parseRestApiConfig(strings.ReplaceAll(testConfigStr, "%PORT%", "9999"))

	if config.AdminPassword != "secret-pass" {
		t.Errorf("AdminPassword = %q, want %q", config.AdminPassword, "secret-pass")
	}
	if config.Port != "9999" {
		t.Errorf("Port = %q, want %q", config.Port, "9999")
	}
	if !config.Enabled {
		t.Error("Enabled = false, want true")
	}
}

func TestParseRestApiConfigDisabled(t *testing.T) {
	config := parseRestApiConfig(`OptionSettings=(AdminPassword="x",RESTAPIEnabled=False)`)

	if config.Enabled {
		t.Error("Enabled = true, want false")
	}
}

func TestParseRestApiConfigDefaults(t *testing.T) {
	config := parseRestApiConfig(`OptionSettings=(AdminPassword="x")`)

	if config.Port != "8212" {
		t.Errorf("Port = %q, want default 8212", config.Port)
	}
	if !config.Enabled {
		t.Error("Enabled = false, want default true")
	}
}

// httptest 서버를 127.0.0.1에 띄우고 그 포트로 설정을 만들어 실제 HTTP 왕복을 검증한다.
func newTestRestServer(t *testing.T, handler http.HandlerFunc) restApiConfig {
	t.Helper()

	server := httptest.NewServer(handler)
	t.Cleanup(server.Close)

	parsed, err := url.Parse(server.URL)
	if err != nil {
		t.Fatal(err)
	}

	return restApiConfig{
		AdminPassword: "secret-pass",
		Port:          parsed.Port(),
		Enabled:       true,
	}
}

func TestCallGameRestApiGetInfo(t *testing.T) {
	config := newTestRestServer(t, func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path != "/v1/api/info" {
			t.Errorf("path = %q, want /v1/api/info", r.URL.Path)
		}
		if r.Method != http.MethodGet {
			t.Errorf("method = %q, want GET", r.Method)
		}

		user, pass, ok := r.BasicAuth()
		if !ok || user != "admin" || pass != "secret-pass" {
			t.Errorf("basic auth = %q/%q/%v, want admin/secret-pass", user, pass, ok)
		}

		w.Write([]byte(`{"version":"v1.0.0","servername":"test server"}`))
	})

	result, err := callGameRestApiWithConfig(config, "info", "")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	var info map[string]string
	if err := json.Unmarshal([]byte(result), &info); err != nil {
		t.Fatalf("response is not valid JSON: %v", err)
	}
	if info["servername"] != "test server" {
		t.Errorf("servername = %q, want %q", info["servername"], "test server")
	}
}

func TestCallGameRestApiPostAnnounce(t *testing.T) {
	config := newTestRestServer(t, func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path != "/v1/api/announce" {
			t.Errorf("path = %q, want /v1/api/announce", r.URL.Path)
		}
		if r.Method != http.MethodPost {
			t.Errorf("method = %q, want POST", r.Method)
		}

		body, _ := io.ReadAll(r.Body)
		if string(body) != `{"message":"hello \"world\""}` {
			t.Errorf("body = %q", string(body))
		}

		w.Write([]byte("OK"))
	})

	// CallGameRestApiJSON과 동일한 직렬화 경로 검증 (따옴표 이스케이프 포함)
	payload, _ := json.Marshal(map[string]string{"message": `hello "world"`})

	if _, err := callGameRestApiWithConfig(config, "announce", string(payload)); err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
}

func TestCallGameRestApiRejectsUnknownEndpoint(t *testing.T) {
	config := restApiConfig{AdminPassword: "x", Port: "1", Enabled: true}

	if _, err := callGameRestApiWithConfig(config, "../../admin", ""); err == nil {
		t.Error("expected error for non-allowlisted endpoint")
	}
}

func TestCallGameRestApiDisabled(t *testing.T) {
	config := restApiConfig{AdminPassword: "x", Port: "1", Enabled: false}

	if _, err := callGameRestApiWithConfig(config, "info", ""); err == nil {
		t.Error("expected error when REST API is disabled")
	}
}

func TestCallGameRestApiTimesOut(t *testing.T) {
	originalTimeout := restApiTimeout
	restApiTimeout = 200 * time.Millisecond
	t.Cleanup(func() { restApiTimeout = originalTimeout })

	config := newTestRestServer(t, func(w http.ResponseWriter, r *http.Request) {
		time.Sleep(2 * time.Second)
	})

	start := time.Now()
	_, err := callGameRestApiWithConfig(config, "info", "")

	if err == nil {
		t.Fatal("expected timeout error")
	}
	if elapsed := time.Since(start); elapsed > time.Second {
		t.Errorf("timed out after %v, want ~200ms", elapsed)
	}
}
