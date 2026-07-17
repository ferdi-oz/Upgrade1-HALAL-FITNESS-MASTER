import React from "react";

import {
  ScrollView,
  View,
  StyleSheet,
} from "react-native";

import { useRouter } from "expo-router";

import Screen from "../../src/components/ui/Screen";
import AppCard from "../../src/components/ui/AppCard";
import AppButton from "../../src/components/ui/AppButton";
import AppText from "../../src/components/ui/AppText";

import { useUser } from "../../src/context/UserContext";

export default function ProfileScreen() {

  const router = useRouter();

  const { user, logout } = useUser();

  const bmi =
    user?.height &&
    user?.weight
      ? (
          user.weight /
          Math.pow(user.height / 100, 2)
        ).toFixed(1)
      : "-";

  return (

    <Screen>

      <ScrollView
        contentContainerStyle={styles.container}
      >

        <AppCard>

          <AppText style={styles.title}>
            👤 Health Profile
          </AppText>

          <AppText style={styles.name}>
            {user?.username ?? "Guest"}
          </AppText>

          <AppText>
            {user?.email || "-"}
          </AppText>

          <View style={{ height: 10 }} />

          <AppText>
            Membership: {user?.mode ?? "Guest"}
          </AppText>

        </AppCard>


        <View style={{ height: 20 }} />

        <AppCard>

          <AppText style={styles.sectionTitle}>
            📊 Body Information
          </AppText>

          <AppText>
            Age: {user?.age ?? "-"}
          </AppText>

          <AppText>
            Gender: {user?.gender || "-"}
          </AppText>

          <AppText>
            Height: {user?.height ?? "-"} cm
          </AppText>

          <AppText>
            Weight: {user?.weight ?? "-"} kg
          </AppText>

          <AppText>
            BMI: {bmi}
          </AppText>

          <AppText>
            Activity: {user?.activityLevel || "-"}
          </AppText>

        </AppCard>

        <View style={{ height: 20 }} />

        <AppCard>

          <AppText style={styles.sectionTitle}>
            ❤️ Health
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

        <View style={{ height: 20 }} />

        <AppCard>

          <AppText style={styles.sectionTitle}>
            👨‍👩‍👧‍👦 Family
          </AppText>

          <AppText>
            Family member management will be available soon.
          </AppText>

        </AppCard>

        <View style={{ height: 24 }} />

        <AppButton
          title="Logout"
          onPress={async () => {

            await logout();

            router.replace("/(tabs)");

          }}
        />

        <View style={{ height: 12 }} />

        <AppButton
          title="Back"
          onPress={() => router.back()}
        />

      </ScrollView>

    </Screen>

  );

}

const styles = StyleSheet.create({

  container: {
    padding: 20,
    paddingBottom: 60,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 8,
  },

  name: {
    fontSize: 22,
    fontWeight: "700",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },

});

