import { View, Text, StyleSheet } from "react-native";

export default function ScannerScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scanner</Text>

      <Text>Camera module will be added in Sprint 5.3</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});