import React from "react";
import {
  TextInput,
  StyleSheet,
  View,
  TextInputProps,
} from "react-native";

import { Colors, Radius, Spacing, Typography } from "../../theme";

interface Props extends TextInputProps {}

export default function AppInput(props: Props) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholderTextColor={Colors.gray}
        style={styles.input}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },

  input: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.input,
    paddingHorizontal: Spacing.md,
    paddingVertical: 14,
    color: Colors.text,
    ...Typography.body,
  },
});