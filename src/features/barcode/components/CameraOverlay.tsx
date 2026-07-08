import React from "react";
import { StyleSheet, Text, View } from "react-native";
import BarcodeFrame from "./BarcodeFrame";

export default function CameraOverlay() {
  return (
    <View style={styles.container} pointerEvents="none">
      <BarcodeFrame />
      <Text style={styles.text}>
        Barkodu çerçevenin içine yerleştirin
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginTop: 24,
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "600",
    textAlign: "center",
    backgroundColor: "rgba(0,0,0,0.45)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },
});