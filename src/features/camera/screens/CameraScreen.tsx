import { View, Text, StyleSheet } from "react-native";

export default function CameraScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📷 Scanner Screen</Text>
      <Text style={styles.subtitle}>Camera Test OK</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#22C55E",
    marginTop: 20,
    fontSize: 18,
  },
});