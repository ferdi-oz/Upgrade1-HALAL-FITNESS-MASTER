import React from "react";
import { View, Image, StyleSheet } from "react-native";

import AppText from "../ui/AppText";

export default function Logo() {
  return (
    <View style={styles.container}>
      <Image
       source={require("../../../assets/images/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <AppText style={styles.title}>
        HALALHEALTH
      </AppText>

      <AppText style={styles.slogan}>
        Know What You Eat, Eat What You Know
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },

  logo: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },

  title: {
    fontSize: 34,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 1,
  },

  slogan: {
    marginTop: 6,
    fontSize: 14,
    color: "#BDBDBD",
    textAlign: "center",
  },
});