import React, { ReactNode } from "react";
import {
  View,
  StyleSheet,
  ViewStyle,
} from "react-native";

import {
  Colors,
  Radius,
  Shadows,
  Spacing,
} from "../../theme";

interface Props {
  children: ReactNode;

  style?: ViewStyle | ViewStyle[];
}

export default function AppCard({
  children,
  style,
}: Props) {
  return (
    <View
      style={[
        styles.card,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,

    borderRadius: Radius.card,

    padding: Spacing.cardPadding,

    marginBottom: Spacing.lg,

    ...Shadows.sm,
  },
});
