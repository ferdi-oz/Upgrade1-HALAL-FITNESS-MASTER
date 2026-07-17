import React from "react";

import FamilyCard from "../../src/components/profile/FamilyCard";


import ProfileHeader from "../../src/components/profile/ProfileHeader";
import HealthCard from "../../src/components/profile/HealthCard";
import StatsCard from "../../src/components/profile/StatsCard";


import {
  ScrollView,
  View,
  StyleSheet,
} from "react-native";

import { useRouter } from "expo-router";

import Screen from "../../src/components/ui/Screen";
import AppButton from "../../src/components/ui/AppButton";

import { useUser } from "../../src/context/UserContext";

export default function ProfileScreen() {

  const router = useRouter();

  const { user, logout } = useUser();

  

  return (

    <Screen>

      <ScrollView
        contentContainerStyle={styles.container}
      >

        


    

        <ProfileHeader user={user} />

<HealthCard user={user} />

<StatsCard
  scanned={0}
  favorites={0}
  history={0}
/>



<View style={{ height: 20 }} />

<FamilyCard />

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

});
