import { useCallback, useState } from "react";
import * as Haptics from "expo-haptics";
import { CameraService } from "../services/CameraService";
import { CameraMode } from "../types/CameraMode";
import { FlashMode } from "../types/FlashMode";

export function useCamera() {
  const [mode, setMode] = useState(CameraService.getMode());
  const [flash, setFlash] = useState(CameraService.getFlash());

  const changeMode = useCallback((newMode: CameraMode) => {
    CameraService.setMode(newMode);
    setMode(newMode);
  }, []);

  const toggleFlash = useCallback(async () => {
    const nextFlash = CameraService.toggleFlash();
    setFlash(nextFlash);

    await Haptics.selectionAsync();
  }, []);

  return {
    mode,
    flash,
    changeMode,
    toggleFlash,
    flashEnabled: flash === FlashMode.ON,
  };
}