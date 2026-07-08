import React from "react";
import { View } from "react-native";
import AppText from "./AppText";

interface Props {
  title: string;
}

export default function EmptyState({
  title,
}: Props) {
  return (
    <View
      style={{
        paddingVertical: 40,
        alignItems: "center",
      }}
    >
      <AppText>{title}</AppText>
    </View>
  );
}