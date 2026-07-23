import React from "react";
import { StyleSheet, View } from "react-native";

import AppText from "../ui/AppText";

export default function PrivacyCard() {
  return (
    <View style={styles.card}>
      <AppText style={styles.title}>
        Privacy & Security
      </AppText>

      <AppText style={styles.item}>
        🔒 Your data is never sold to third parties.
      </AppText>

      <AppText style={styles.item}>
        📱 Offline-first analysis whenever possible.
      </AppText>

      <AppText style={styles.item}>
        🚫 No advertising or tracking.
      </AppText>

      <AppText style={styles.item}>
        ✅ Transparent halal and health analysis.
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
  },

  item: {
    fontSize: 15,
    marginBottom: 10,
    lineHeight: 22,
  },
});