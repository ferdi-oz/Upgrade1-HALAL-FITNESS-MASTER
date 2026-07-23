import React from "react";
import { StyleSheet } from "react-native";

import AppCard from "../ui/AppCard";
import AppButton from "../ui/AppButton";
import AppText from "../ui/AppText";

interface Props {
  onContinue: () => void;
}

export default function GuestCard({
  onContinue,
}: Props) {
  return (
    <AppCard style={styles.card}>
      <AppText style={styles.title}>
        Continue as Guest
      </AppText>

      <AppText style={styles.description}>
        • 5 analyses per day{"\n"}
        • Halal / Haram analysis only{"\n"}
        • Registration required for health profiles
      </AppText>

      <AppButton
        title="Continue as Guest"
        onPress={onContinue}
      />
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
  },
  description: {
    marginBottom: 20,
    lineHeight: 22,
  },
});