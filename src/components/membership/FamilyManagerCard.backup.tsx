import React from "react";
import { StyleSheet, View } from "react-native";

import AppButton from "../ui/AppButton";
import AppText from "../ui/AppText";

export default function FamilyManagerCard() {
  return (
    <View style={styles.card}>
      <AppText style={styles.title}>
        Family Sharing
      </AppText>

      <AppText style={styles.description}>
        Invite your family members and manage shared Premium access.
      </AppText>

      <AppButton
        title="Manage Family"
        onPress={() => {}}
      />
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
    marginBottom: 10,
  },

  description: {
    fontSize: 15,
    marginBottom: 20,
    lineHeight: 22,
  },
});