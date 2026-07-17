import React from "react";
import { StyleSheet } from "react-native";

import AppCard from "../ui/AppCard";
import AppText from "../ui/AppText";

import { UserProfile } from "../../context/UserContext";

interface Props {
  user: UserProfile | null;
}

export default function HealthCard({ user }: Props) {

  const bmi =
    user?.height && user?.weight
      ? (
          user.weight /
          Math.pow(user.height / 100, 2)
        ).toFixed(1)
      : "-";

  return (

    <AppCard style={styles.card}>

      <AppText style={styles.title}>
        ❤️ Health Information
      </AppText>

      <AppText>Age: {user?.age ?? "-"}</AppText>

      <AppText>Gender: {user?.gender || "-"}</AppText>

      <AppText>
        Height: {user?.height ?? "-"} cm
      </AppText>

      <AppText>
        Weight: {user?.weight ?? "-"} kg
      </AppText>

      <AppText>BMI: {bmi}</AppText>

      <AppText>
        Activity: {user?.activityLevel || "-"}
      </AppText>

      <AppText>
        Goal: {user?.goal || "-"}
      </AppText>

      <AppText>
        Diet: {user?.diet || "-"}
      </AppText>

      <AppText>
        Allergies: {user?.allergies || "-"}
      </AppText>

      <AppText>
        Diseases: {user?.diseases || "-"}
      </AppText>

    </AppCard>

  );

}

const styles = StyleSheet.create({

  card: {
    marginTop: 16,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
  },

});