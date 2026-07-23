import React from "react";
import { StyleSheet, View } from "react-native";

import AppText from "../ui/AppText";
import AppButton from "../ui/AppButton";

export default function HeroMembershipCard() {
  return (
    <View style={styles.card}>
      <AppText style={styles.badge}>⭐ PREMIUM</AppText>

      <AppText style={styles.title}>
        Unlock Unlimited Halal Analysis
      </AppText>

      <AppText style={styles.description}>
        Upgrade to Premium to enjoy unlimited scans, family sharing,
        OCR analysis, offline features and much more.
      </AppText>

      <AppButton
        title="Upgrade to Premium"
        onPress={() => {}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#2E7D32",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },

  badge: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 8,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 10,
  },

  description: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
});