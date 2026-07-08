import { CameraPermissionState } from "../types/CameraPermissionState";

export class CameraPermissionService {
  private static permission = CameraPermissionState.UNKNOWN;

  static getPermission() {
    return this.permission;
  }

  static setPermission(permission: CameraPermissionState) {
    this.permission = permission;
  }
}