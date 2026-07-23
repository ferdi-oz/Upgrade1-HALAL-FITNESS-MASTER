import React from "react";
import { View, StyleSheet } from "react-native";
import AppText from "../ui/AppText";

const benefits = [
  "Unlimited Scans",
  "Family Sharing",
  "OCR Analysis",
  "Favorites",
  "Scan History",
  "Offline Database",
  "Privacy First",
  "Priority Updates",
];

export default function PremiumBenefitsCard() {
  return (
    <View style={styles.card}>
      <AppText style={styles.title}>Premium Benefits</AppText>

      {benefits.map((item) => (
        <View key={item} style={styles.row}>
          <AppText style={styles.icon}>✓</AppText>
          <AppText style={styles.text}>{item}</AppText>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  icon: {
    color: "#2E7D32",
    fontSize: 18,
    marginRight: 10,
  },

  text: {
    fontSize: 16,
  },
});