import { useRef, useState } from "react";
import * as Haptics from "expo-haptics";
import { BarcodeScanningResult } from "expo-camera";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import AppText from "../../src/components/ui/AppText";

export default function ScanScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [flash, setFlash] = useState(false);
const lastBarcode = useRef("");
const lastScanTime = useRef(0);


const handleBarcodeScanned = async (
  result: BarcodeScanningResult
) => {
  const now = Date.now();

  // Aynı barkodu 5 saniye içinde tekrar okuma
  if (
    result.data === lastBarcode.current &&
    now - lastScanTime.current < 5000
  ) {
    return;
  }

  lastBarcode.current = result.data;
  lastScanTime.current = now;

  await Haptics.notificationAsync(
    Haptics.NotificationFeedbackType.Success
  );

  router.push({
    pathname: "/product/[barcode]",
    params: {
      barcode: result.data,
    },
  });
};

  if (!permission) return null;

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Ionicons
          name="camera-outline"
          size={70}
          color="#2E7D32"
        />

        <AppText style={styles.permissionTitle}>
          Kamera İzni Gerekli
        </AppText>

        <AppText style={styles.permissionText}>
          Barkod tarayabilmek için kameraya erişim izni vermelisiniz.
        </AppText>

        <TouchableOpacity
          style={styles.permissionButton}
          onPress={requestPermission}
        >
          <AppText style={styles.permissionButtonText}>
            İzin Ver
          </AppText>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <CameraView
    style={StyleSheet.absoluteFillObject}
    facing="back"
    enableTorch={flash}
    barcodeScannerSettings={{
      barcodeTypes: [
        "ean13",
        "ean8",
        "upc_a",
        "upc_e",
        "code128",
        "qr",
      ],
    }}
    onBarcodeScanned={handleBarcodeScanned}
/>

      <View style={styles.overlay}>

        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => router.back()}
        >
          <Ionicons
            name="close"
            size={30}
            color="white"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.flashButton}
          onPress={() => setFlash(!flash)}
        >
          <Ionicons
            name={flash ? "flash" : "flash-off"}
            size={26}
            color="white"
          />
        </TouchableOpacity>

        <View style={styles.scanFrame}>

          <View style={[styles.corner, styles.topLeft]} />
          <View style={[styles.corner, styles.topRight]} />
          <View style={[styles.corner, styles.bottomLeft]} />
          <View style={[styles.corner, styles.bottomRight]} />

        </View>

        <AppText style={styles.title}>
          Barkodu çerçeve içine hizalayın
        </AppText>

        <AppText style={styles.subtitle}>
          Barkod otomatik olarak algılanacaktır.
        </AppText>

      </View>

    </View>
  );
}

const GREEN = "#33C759";

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "black",
  },

  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  scanFrame: {
    width: 280,
    height: 180,
    position: "relative",
  },

  corner: {
    width: 45,
    height: 45,
    position: "absolute",
    borderColor: GREEN,
  },

  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 5,
    borderLeftWidth: 5,
  },

  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 5,
    borderRightWidth: 5,
  },

  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 5,
    borderLeftWidth: 5,
  },

  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 5,
    borderRightWidth: 5,
  },

  title: {
    marginTop: 40,
    color: "white",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },

  subtitle: {
    marginTop: 10,
    color: "#DDDDDD",
    textAlign: "center",
    paddingHorizontal: 30,
  },

  flashButton: {
    position: "absolute",
    top: 55,
    right: 25,
  },

  closeButton: {
    position: "absolute",
    top: 55,
    left: 25,
  },

  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },

  permissionTitle: {
    fontSize: 22,
    marginTop: 20,
    fontWeight: "700",
  },

  permissionText: {
    textAlign: "center",
    marginTop: 15,
    marginBottom: 25,
  },

  permissionButton: {
    backgroundColor: GREEN,
    paddingHorizontal: 35,
    paddingVertical: 14,
    borderRadius: 12,
  },

  permissionButtonText: {
    color: "white",
    fontWeight: "700",
  },

});