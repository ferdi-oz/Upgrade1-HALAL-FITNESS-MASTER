import { useCallback, useState } from "react";
import { BarcodeService } from "../services/BarcodeService";
import { BarcodeResult } from "../types/BarcodeResult";

export function useBarcodeScanner() {
  const [result, setResult] = useState<BarcodeResult | null>(null);
  const [isScanning, setIsScanning] = useState(true);

  const onBarcodeScanned = useCallback(
    (barcode: string, format: string) => {
      if (!isScanning) {
        return;
      }

      if (!BarcodeService.shouldProcess(barcode)) {
        return;
      }

      const scanResult = BarcodeService.createResult(barcode, format);

      setResult(scanResult);
      setIsScanning(false);
    },
    [isScanning]
  );

  const resetScanner = useCallback(() => {
    BarcodeService.reset();
    setResult(null);
    setIsScanning(true);
  }, []);

  return {
    result,
    isScanning,
    onBarcodeScanned,
    resetScanner,
  };
}