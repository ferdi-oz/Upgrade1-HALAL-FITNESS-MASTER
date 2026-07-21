import React, {
  useCallback,
  useRef,
  useState,
  useEffect,
} from "react";


import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  Dimensions,
  ActivityIndicator,
  Vibration,
} from "react-native";

import {
  CameraView,
  CameraType,
  BarcodeScanningResult,
  useCameraPermissions,
} from "expo-camera";

import {
  useRouter,
  useFocusEffect,
} from "expo-router";

import { MaterialCommunityIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const FRAME_SIZE = Math.min(width * 0.72, 280);

export default function CameraScreen() {

  const router = useRouter();





  const [permission, requestPermission] =
    useCameraPermissions();

  const [flash, setFlash] =
    useState(false);

  const [enabled, setEnabled] =
    useState(true);

  const lastBarcode =
    useRef("");




  const laser =
    useRef(new Animated.Value(0)).current;

  useEffect(() => {

    const animation = Animated.loop(

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

    );

    animation.start();

    return () => {

      animation.stop();

      laser.stopAnimation();

    };

  }, []);

  useFocusEffect(

    useCallback(() => {

      setEnabled(true);

      lastBarcode.current = "";

      return () => {

        setEnabled(false);

      };

    }, [])

  );

  const handleBarcode =

    useCallback(

      (result: BarcodeScanningResult) => {

        if (!enabled) return;

        const code = result.data?.trim();

        if (!code) return;

        if (lastBarcode.current === code) return;

       lastBarcode.current = code;

setEnabled(false);

Vibration.vibrate(80);

router.push({
  pathname: "/product/[barcode]",
  params: {
    barcode: code,
  },
});      },

      [enabled, router]

    );


  if (!permission) {

    return (

      <View style={styles.loading}>

        <ActivityIndicator
          size="large"
          color="#7DFF3A"
        />

      </View>

    );

  }

  if (!permission.granted) {

    return (

      <View style={styles.permissionContainer}>

        <MaterialCommunityIcons
          name="camera"
          size={70}
          color="#7DFF3A"
        />

        <Text style={styles.permissionTitle}>
          Camera Permission Required
        </Text>

        <Text style={styles.permissionText}>
          HALALHEALTH needs camera access to scan product barcodes.
        </Text>

        <Pressable
          style={styles.permissionButton}
          onPress={requestPermission}
        >

          <Text style={styles.permissionButtonText}>
            Allow Camera
          </Text>

        </Pressable>

      </View>

    );

  }

  return (

    <View style={styles.container}>

      <CameraView

        style={StyleSheet.absoluteFillObject}

        facing={"back" as CameraType}

        enableTorch={flash}

        barcodeScannerSettings={{

          barcodeTypes: [

            "ean13",

            "ean8",

            "upc_a",

            "upc_e",

            "code128",

            "code39",

            "code93",

            "codabar",

            "itf14",

            "qr",

            "pdf417",

            "aztec",

            "datamatrix",

          ],

        }}

        onBarcodeScanned={

          enabled

            ? handleBarcode

            : undefined

        }

      />

      <View style={styles.overlay}>

        <Pressable

          style={styles.closeButton}

          onPress={() => router.back()}

        >

          <MaterialCommunityIcons

            name="close"

            size={30}

            color="#FFFFFF"

          />

        </Pressable>

        <Pressable

          style={styles.flashButton}

          onPress={() =>

            setFlash(!flash)

          }

        >

          <MaterialCommunityIcons

            name={

              flash

                ? "flashlight-off"

                : "flashlight"

            }

            size={26}

            color="#FFFFFF"

          />

        </Pressable>

        <View style={styles.topShade} />

        <View style={styles.middleRow}>

          <View style={styles.sideShade} />

          <View style={styles.scanFrame}>

            <View style={styles.cornerTL} />
            <View style={styles.cornerTR} />
            <View style={styles.cornerBL} />
            <View style={styles.cornerBR} />

            <Animated.View

              style={[

                styles.laser,

                {

                  transform: [

                    {

                      translateY:

                        laser.interpolate({

                          inputRange: [0, 1],

                          outputRange: [0, FRAME_SIZE - 6],

                        }),

                    },

                  ],

                },

              ]}

            />

          </View>

          <View style={styles.sideShade} />

        </View>


        <View style={styles.bottomShade}>

          <Text style={styles.title}>
            Barkodu Çerçevenin İçine Getirin
          </Text>

          <Text style={styles.subtitle}>
            EAN-13 • EAN-8 • UPC • QR • Code128
          </Text>

          <View style={styles.statusBox}>

            <ActivityIndicator
              size="small"
              color="#7DFF3A"
            />

            <Text style={styles.statusText}>
              Scanning...
            </Text>

          </View>

        </View>

      </View>

    </View>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },

  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#08120A",
    paddingHorizontal: 30,
  },

  permissionTitle: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "700",
    marginTop: 20,
  },

  permissionText: {
    color: "#BDBDBD",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    marginTop: 16,
    marginBottom: 30,
  },

  permissionButton: {
    backgroundColor: "#22C55E",
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 14,
  },

  permissionButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  overlay: {
    flex: 1,
  },

  closeButton: {
    position: "absolute",
    top: 55,
    left: 20,
    zIndex: 100,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "center",
    alignItems: "center",
  },

  flashButton: {
    position: "absolute",
    top: 55,
    right: 20,
    zIndex: 100,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "center",
    alignItems: "center",
  },

  topShade: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.60)",
  },

  middleRow: {
    flexDirection: "row",
    height: FRAME_SIZE,
  },

  sideShade: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.60)",
  },

  scanFrame: {
    width: FRAME_SIZE,
    height: FRAME_SIZE,
    borderRadius: 22,
    overflow: "hidden",
  },


  cornerTL: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 42,
    height: 42,
    borderTopWidth: 5,
    borderLeftWidth: 5,
    borderColor: "#22C55E",
    borderTopLeftRadius: 18,
  },

  cornerTR: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 42,
    height: 42,
    borderTopWidth: 5,
    borderRightWidth: 5,
    borderColor: "#22C55E",
    borderTopRightRadius: 18,
  },

  cornerBL: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 42,
    height: 42,
    borderBottomWidth: 5,
    borderLeftWidth: 5,
    borderColor: "#22C55E",
    borderBottomLeftRadius: 18,
  },

  cornerBR: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 42,
    height: 42,
    borderBottomWidth: 5,
    borderRightWidth: 5,
    borderColor: "#22C55E",
    borderBottomRightRadius: 18,
  },

  laser: {
    position: "absolute",
    left: 12,
    right: 12,
    height: 3,
    borderRadius: 2,
    backgroundColor: "#7DFF3A",
    shadowColor: "#7DFF3A",
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 12,
  },

  bottomShade: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.60)",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 28,
    paddingHorizontal: 24,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
  },

  subtitle: {
    color: "#D1D5DB",
    fontSize: 15,
    marginTop: 10,
    textAlign: "center",
  },

  statusBox: {
    marginTop: 24,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(34,197,94,0.12)",
    borderWidth: 1,
    borderColor: "#22C55E",
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },

  statusText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
    marginLeft: 10,
  },

});

