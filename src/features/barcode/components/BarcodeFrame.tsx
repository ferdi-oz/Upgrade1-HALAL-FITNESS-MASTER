import React from "react";
import { StyleSheet, View } from "react-native";

export default function BarcodeFrame() {
  return <View style={styles.frame} />;
}

const styles = StyleSheet.create({
  frame: {
    width: 260,
    height: 180,
    borderWidth: 3,
    borderRadius: 16,
    borderColor: "#16A34A",
    backgroundColor: "transparent",
  },
});