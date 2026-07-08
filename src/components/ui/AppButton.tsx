import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";

import {
  Colors,
  Radius,
  Shadows,
  Spacing,
  Typography,
} from "../../theme";

interface Props {
  title: string;
  onPress: () => void;

  disabled?: boolean;

  style?: ViewStyle;

  textStyle?: TextStyle;
}

export default function AppButton({
  title,
  onPress,
  disabled = false,
  style,
  textStyle,
}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.button,
        disabled && styles.disabled,
        style,
      ]}
    >
      <Text style={[Typography.button, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,

    borderRadius: Radius.button,

    paddingVertical: 16,

    alignItems: "center",

    justifyContent: "center",

    ...Shadows.sm,
  },

  disabled: {
    opacity: 0.5,
  },
});