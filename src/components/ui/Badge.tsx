import React from "react";
import { View, StyleSheet } from "react-native";
import AppText from "./AppText";
import { Colors, Radius, Spacing } from "../../theme";

interface Props {
  title: string;
  color?: string;
}

export default function Badge({
  title,
  color = Colors.primary,
}: Props) {
  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: color,
        },
      ]}
    >
      <AppText style={styles.text}>
        {title}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: Radius.pill,
  },

  text: {
    color: Colors.white,
    fontWeight: "600",
  },
});