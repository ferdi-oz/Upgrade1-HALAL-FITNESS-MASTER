import React from "react";
import { View, StyleSheet } from "react-native";
import AppText from "../ui/AppText";

const rows = [
  ["Daily Scans", "5/day", "Unlimited"],
  ["Favorites", "✓", "✓"],
  ["History", "✓", "✓"],
  ["OCR", "✗", "✓"],
  ["Family Sharing", "✗", "✓"],
  ["Offline Database", "✓", "✓"],
];

export default function ComparisonTable() {
  return (
    <View style={styles.card}>
      <AppText style={styles.title}>Guest vs Premium</AppText>

      <View style={styles.header}>
        <AppText style={styles.headerCell}>Feature</AppText>
        <AppText style={styles.headerCell}>Guest</AppText>
        <AppText style={styles.headerCell}>Premium</AppText>
      </View>

      {rows.map(([feature, guest, premium]) => (
        <View key={feature} style={styles.row}>
          <AppText style={styles.cell}>{feature}</AppText>
          <AppText style={styles.cell}>{guest}</AppText>
          <AppText style={styles.cell}>{premium}</AppText>
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
  header: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 8,
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    paddingVertical: 8,
  },
  headerCell: {
    flex: 1,
    fontWeight: "700",
    textAlign: "center",
  },
  cell: {
    flex: 1,
    textAlign: "center",
  },
});