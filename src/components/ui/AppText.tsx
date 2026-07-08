import React from "react";
import {
  Text,
  TextProps,
} from "react-native";

import { Typography } from "../../theme";

interface AppTextProps extends TextProps {}

export default function AppText({
  style,
  ...props
}: AppTextProps) {
  return (
    <Text
      {...props}
      style={[
        Typography.body,
        style,
      ]}
    />
  );
}