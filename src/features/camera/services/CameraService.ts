import { CameraMode } from "../types/CameraMode";
import { FlashMode } from "../types/FlashMode";

export class CameraService {
  private static flash: FlashMode = FlashMode.OFF;

  private static mode: CameraMode = CameraMode.BARCODE;

  static getMode(): CameraMode {
    return this.mode;
  }

  static setMode(mode: CameraMode): void {
    this.mode = mode;
  }

  static getFlash(): FlashMode {
    return this.flash;
  }

  static toggleFlash(): FlashMode {
    this.flash =
      this.flash === FlashMode.OFF
        ? FlashMode.ON
        : FlashMode.OFF;

    return this.flash;
  }
}