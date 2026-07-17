import React, {
  useEffect,
  useMemo,
  useState,
} from "react";
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


import { FavoriteRepository } from "../../src/database/repositories/FavoriteRepository";
import { HistoryRepository } from "../../src/database/repositories/HistoryRepository";


export default function ProfileScreen() {

  const router = useRouter();

  const { user, logout } = useUser();



const favoriteRepository = useMemo(
  () => new FavoriteRepository(),
  []
);

const historyRepository = useMemo(
  () => new HistoryRepository(),
  []
);



const [favoriteCount, setFavoriteCount] =
  useState(0);

const [historyCount, setHistoryCount] =
  useState(0);


useEffect(() => {

  async function loadStats() {

    if (!user) {
      return;
    }

    const favorites =
      await favoriteRepository.getFavoriteCount(
        user.id
      );

    const history =
      await historyRepository.getHistoryCount(
        user.id
      );

    setFavoriteCount(favorites);

    setHistoryCount(history);

  }

  loadStats();

}, [
  user,
  favoriteRepository,
  historyRepository,
]);
  

  return (

    <Screen>

      <ScrollView
        contentContainerStyle={styles.container}
      >

        


    

        <ProfileHeader user={user} />

<HealthCard user={user} />

<StatsCard
  scanned={historyCount}
  favorites={favoriteCount}
  history={historyCount}
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
