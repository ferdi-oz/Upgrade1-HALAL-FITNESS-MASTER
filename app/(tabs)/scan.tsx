import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";

import {
  CameraView,
  BarcodeScanningResult,
  useCameraPermissions,
} from "expo-camera";

import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";

import ProductService from "../../src/services/ProductService";


import AppText from "../../src/components/ui/AppText";
import { BarcodeValidator } from "../../src/services/BarcodeValidator";

const GREEN = "#7DFF3A";

export default function ScanScreen() {

  const [permission, requestPermission] =
    useCameraPermissions();

  const [flash, setFlash] = useState(false);

  const laser = useRef(
    new Animated.Value(0)
  ).current;

  const lastBarcode = useRef("");

  const lastScanTime = useRef(0);

  const scanning = useRef(false);
  useEffect(() => {

    Animated.loop(

      Animated.sequence([

        Animated.timing(laser, {
          toValue: 1,
          duration: 1800,
          useNativeDriver: true,
        }),

        Animated.timing(laser, {
          toValue: 0,
          duration: 1800,
          useNativeDriver: true,
        }),

      ])

    ).start();

  }, []);

  const handleBarcodeScanned = async (
    result: BarcodeScanningResult
  ) => {

    if (scanning.current) {
      return;
    }

    scanning.current = true;

    const now = Date.now();

    if (!BarcodeValidator.isValidEAN13(result.data)) {
      scanning.current = false;
      return;
    }

    if (
      result.data === lastBarcode.current &&
      now - lastScanTime.current < 5000
    ) {
      scanning.current = false;
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

setTimeout(() => {
  scanning.current = false;
}, 1500);
  };
  if (!permission) {
    return null;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>

        <Ionicons
          name="camera-outline"
          size={80}
          color={GREEN}
        />

        <AppText style={styles.permissionTitle}>
          Camera Permission Required
        </AppText>

        <AppText style={styles.permissionText}>
          Allow camera access to scan product barcodes.
        </AppText>

        <TouchableOpacity
          style={styles.permissionButton}
          onPress={requestPermission}
        >
          <AppText style={styles.permissionButtonText}>
            Allow Camera
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
          ],
        }}
        onBarcodeScanned={handleBarcodeScanned}
      >
        <View style={styles.overlay}>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => router.back()}
          >
            <Ionicons
              name="close"
              size={30}
              color="#FFFFFF"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.flashButton}
            onPress={() => setFlash(!flash)}
          >
            <Ionicons
              name={flash ? "flash" : "flash-off"}
              size={28}
              color="#FFFFFF"
            />
          </TouchableOpacity>

          <View style={styles.scanFrame}>

            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />

            <Animated.View
              style={[
                styles.laser,
                {
                  transform: [
                    {
                      translateY: laser.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-90, 90],
                      }),
                    },
                  ],
                },
              ]}
            />

          </View>

          <AppText style={styles.title}>
            Align barcode inside frame
          </AppText>

          <AppText style={styles.subtitle}>
            Barcode will be detected automatically
          </AppText>

        </View>

      </CameraView>

    </View>

  );

}
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#050505",
  },

  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  scanFrame: {
    width: 310,
    height: 200,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },

  laser: {
    position: "absolute",

    width: 260,
    height: 3,

    backgroundColor: GREEN,

    shadowColor: GREEN,
    shadowOpacity: 1,
    shadowRadius: 16,

    elevation: 12,
  },

  corner: {
    position: "absolute",

    width: 42,
    height: 42,

    borderColor: GREEN,
  },

  topLeft: {
    top: 0,
    left: 0,

    borderTopWidth: 6,
    borderLeftWidth: 6,
  },

  topRight: {
    top: 0,
    right: 0,

    borderTopWidth: 6,
    borderRightWidth: 6,
  },

  bottomLeft: {
    bottom: 0,
    left: 0,

    borderBottomWidth: 6,
    borderLeftWidth: 6,
  },

  bottomRight: {
    bottom: 0,
    right: 0,

    borderBottomWidth: 6,
    borderRightWidth: 6,
  },

  closeButton: {
    position: "absolute",

    top: 60,
    left: 24,

    zIndex: 10,
  },

  flashButton: {
    position: "absolute",

    top: 60,
    right: 24,

    zIndex: 10,
  },

  title: {
    marginTop: 40,

    color: "#FFFFFF",

    fontSize: 22,

    fontWeight: "700",

    textAlign: "center",
  },

  subtitle: {
    marginTop: 12,

    color: "#CCCCCC",

    fontSize: 15,

    textAlign: "center",
  },
  permissionContainer: {
    flex: 1,

    justifyContent: "center",

    alignItems: "center",

    backgroundColor: "#050505",

    paddingHorizontal: 30,
  },

  permissionTitle: {

    color: "#FFFFFF",

    fontSize: 24,

    fontWeight: "700",

    marginTop: 24,
  },

  permissionText: {

    color: "#BBBBBB",

    fontSize: 16,

    textAlign: "center",

    marginTop: 12,

    marginBottom: 30,

    lineHeight: 24,
  },

  permissionButton: {

    backgroundColor: GREEN,

    paddingHorizontal: 36,

    paddingVertical: 16,

    borderRadius: 30,

    elevation: 10,

    shadowColor: GREEN,

    shadowOpacity: 0.35,

    shadowRadius: 12,
  },

  permissionButtonText: {

    color: "#050505",

    fontSize: 17,

    fontWeight: "700",
  },

});