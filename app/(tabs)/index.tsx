import React from "react";
import { View, StyleSheet } from "react-native";
import { router } from "expo-router";

import Screen from "../../src/components/ui/Screen";
import AppHeader from "../../src/components/ui/AppHeader";
import AppButton from "../../src/components/ui/AppButton";
import AppCard from "../../src/components/ui/AppCard";
import AppText from "../../src/components/ui/AppText";
import SectionTitle from "../../src/components/ui/SectionTitle";

export default function HomeScreen() {

  return (

    <Screen>

      <AppHeader title="🍃 HALAL&FITNESS MASTER" />

      <View style={styles.space} />

      <AppButton
        title="📷 Barkod Tara"
        onPress={() => router.push("/scan")}
      />

      <View style={styles.smallSpace} />

      <AppButton
        title="🔍 Ürün Ara"
        onPress={() => router.push("/search")}
      />

      <View style={styles.space} />

      <SectionTitle title="Bugünkü Beslenme" />

      <AppCard>

        <AppText>🔥 Kalori : 0 kcal</AppText>

        <AppText>💪 Protein : 0 g</AppText>

        <AppText>🥖 Karbonhidrat : 0 g</AppText>

        <AppText>🥑 Yağ : 0 g</AppText>

      </AppCard>

      <SectionTitle title="Son Taranan Ürünler" />

      <AppCard>

        <AppText>Henüz ürün taranmadı.</AppText>

      </AppCard>

    </Screen>

  );

}

const styles = StyleSheet.create({

  space: {
    height: 24,
  },

  smallSpace: {
    height: 12,
  },

});
