import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";

import AppText from "../ui/AppText";

type Props = {
  onPress: () => void;
};

export default function RegisterButton({ onPress }: Props) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <AppText style={styles.text}>
        👤 Register
      </AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#102117",

    borderColor: "#8BC34A",
    borderWidth: 1.5,

    paddingHorizontal: 18,
    paddingVertical: 10,

    borderRadius: 18,

    shadowColor: "#8BC34A",
    shadowOpacity: 0.45,
    shadowRadius: 12,

    elevation: 8,
  },

  text: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 15,
  },
});