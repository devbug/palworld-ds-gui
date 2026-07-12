package utils

import (
	"path/filepath"
	"testing"
)

func TestGetAppDataDirReturnsAbsolutePath(t *testing.T) {
	// Arrange & Act
	dir := GetAppDataDir()

	// Assert
	if !filepath.IsAbs(dir) {
		t.Errorf("expected absolute path, got %q", dir)
	}

	if filepath.Base(dir) != "PalworldDSGUI" {
		t.Errorf("expected dir to end with PalworldDSGUI, got %q", dir)
	}
}
