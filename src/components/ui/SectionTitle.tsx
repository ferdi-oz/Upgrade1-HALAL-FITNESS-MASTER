import React from "react";
import AppText from "./AppText";

interface Props {
  title: string;
}

export default function SectionTitle({
  title,
}: Props) {
  return (
    <AppText
      style={{
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 12,
      }}
    >
      {title}
    </AppText>
  );
}