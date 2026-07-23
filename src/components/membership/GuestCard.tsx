import React from "react";
import { StyleSheet } from "react-native";

import AppCard from "../ui/AppCard";
import AppButton from "../ui/AppButton";
import AppText from "../ui/AppText";

import guestStore from "../../store/GuestStore";

interface Props {
  onContinue: () => void;
}

export default function GuestCard({
  onContinue,
}: Props) {

  const remaining = guestStore.getRemainingScans();
  const used = guestStore.getScansToday();

  const canScan = guestStore.canScan();

  return (
    <AppCard style={styles.card}>

      <AppText style={styles.title}>
        Continue as Guest
      </AppText>

      <AppText style={styles.description}>
        Daily scans: {used}/5{"\n"}
        Remaining scans: {remaining}{"\n"}
        {"\n"}
        • Halal / Haram analysis only{"\n"}
        • Registration required for health profiles
      </AppText>

      <AppButton
        title={
          canScan
            ? "Continue as Guest"
            : "Daily Limit Reached"
        }
        disabled={!canScan}
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
