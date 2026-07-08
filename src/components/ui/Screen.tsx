import React, { ReactNode } from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  Colors,
  Spacing,
} from "../../theme";

interface ScreenProps {
  children: ReactNode;
  style?: ViewStyle;
}

export default function Screen({
  children,
  style,
}: ScreenProps) {
  return (
    <SafeAreaView
      edges={["top"]}
      style={[styles.container, style]}
    >
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.screenHorizontal,
    paddingVertical: Spacing.screenVertical,
  },
});