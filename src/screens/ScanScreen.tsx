import React from "react";
import { View, StyleSheet } from "react-native";
import AppText from "../components/ui/AppText";

export default function ScanScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.scanArea}>
        <AppText style={styles.cameraIcon}>📷</AppText>

        <AppText style={styles.title}>
          Scan Product
        </AppText>

        <AppText style={styles.subtitle}>
          Camera screen is being prepared...
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050505",
    justifyContent: "center",
    alignItems: "center",
  },

  scanArea: {
    width: 310,
    height: 200,

    backgroundColor: "#111111",

    borderRadius: 30,

    borderWidth: 2,

    borderColor: "#7DFF3A",

    justifyContent: "center",

    alignItems: "center",
  },

  cameraIcon: {
    fontSize: 72,
    marginBottom: 18,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
  },

  subtitle: {
    color: "#AAAAAA",
    fontSize: 15,
    marginTop: 12,
  },
});