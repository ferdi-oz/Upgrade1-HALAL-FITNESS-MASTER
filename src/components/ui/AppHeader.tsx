import React from "react";
import { View } from "react-native";

import AppText from "./AppText";

interface Props {
  title: string;
}

export default function AppHeader({
  title,
}: Props) {
  return (
    <View>
      <AppText
        style={{
          fontSize: 28,
          fontWeight: "700",
        }}
      >
        {title}
      </AppText>
    </View>
  );
}