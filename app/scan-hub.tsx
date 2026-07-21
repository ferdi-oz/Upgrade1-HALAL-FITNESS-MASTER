import React from "react";
import { StyleSheet, View } from "react-native";
import { router } from "expo-router";

import Screen from "../src/components/ui/Screen";
import AppCard from "../src/components/ui/AppCard";
import AppButton from "../src/components/ui/AppButton";
import AppText from "../src/components/ui/AppText";

export default function ScanHubScreen() {

  return (

    <Screen>

      <View style={styles.container}>

        <AppText style={styles.title}>
          Scan Product
        </AppText>

        <AppCard style={styles.card}>

          <AppButton
            title="📷 Barcode / QR Scan"
            onPress={() => router.push("/scanner")}
          />

          <View style={styles.space} />

          <AppButton
            title="🧾 Take Ingredient Photo"
            onPress={() => router.push("/scanner")}
          />

          <View style={styles.space} />

          <AppButton
            title="🖼 Upload Ingredient Photo"
            onPress={() => router.push("/scanner")}
          />

          <View style={styles.space} />

          <AppButton
            title="⌨ Manual Barcode"
            onPress={() => router.push("/scanner")}
          />

        </AppCard>

      </View>

    </Screen>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 25,
  },

  card: {
    padding: 20,
  },

  space: {
    height: 15,
  },

});