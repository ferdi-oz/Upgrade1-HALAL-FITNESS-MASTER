import { BarcodeResult } from "../types/BarcodeResult";

export class BarcodeService {
  private static lastBarcode: string | null = null;

  static shouldProcess(barcode: string): boolean {
    if (this.lastBarcode === barcode) {
      return false;
    }

    this.lastBarcode = barcode;
    return true;
  }

  static createResult(
    barcode: string,
    format: string
  ): BarcodeResult {
    return {
      barcode,
      format,
      scannedAt: new Date(),
    };
  }

  static reset(): void {
    this.lastBarcode = null;
  }
}