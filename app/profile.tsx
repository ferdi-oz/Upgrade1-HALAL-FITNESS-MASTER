import React from "react";


import { ScrollView, View } from "react-native";


import { useRouter } from "expo-router";

import Screen from "../src/components/ui/Screen";
import AppCard from "../src/components/ui/AppCard";
import AppButton from "../src/components/ui/AppButton";
import AppText from "../src/components/ui/AppText";

import { useUser } from "../src/context/UserContext";

export default function ProfileScreen() {

  const router = useRouter();

  const { user, logout } = useUser();

  return (

    <Screen>

      <ScrollView contentContainerStyle={{ padding: 20 }}>

        <AppCard>

          <AppText
            style={{
              fontSize: 24,
              fontWeight: "700",
              marginBottom: 12,
            }}
          >
            👤 Profile
          </AppText>

          <AppText>
            Username: {user?.username ?? "Guest"}
          </AppText>

          <AppText>
            Plan: {user?.mode ?? "guest"}
          </AppText>

        </AppCard>


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