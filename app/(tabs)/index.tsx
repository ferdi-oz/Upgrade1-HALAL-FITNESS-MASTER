import React from "react";
import { View, StyleSheet } from "react-native";

import Screen from "../../src/components/ui/Screen";
import AppHeader from "../../src/components/ui/AppHeader";
import AppButton from "../../src/components/ui/AppButton";
import AppCard from "../../src/components/ui/AppCard";
import AppText from "../../src/components/ui/AppText";
import SectionTitle from "../../src/components/ui/SectionTitle";

export default function HomeScreen() {
  return (
    <Screen>

      <AppHeader title="☪ HALAL&FITNESS MASTER" />

      <View style={styles.space} />

      <AppButton
        title="📷 Scan Barcode"
        onPress={() => {}}
      />

      <View style={styles.smallSpace} />

      <AppButton
        title="🔍 Search Product"
        onPress={() => {}}
      />

      <View style={styles.space} />

      <SectionTitle title="Today's Nutrition" />

      <AppCard>

        <AppText>🔥 Calories : 0 kcal</AppText>

        <AppText>💪 Protein : 0 g</AppText>

        <AppText>🥦 Carbs : 0 g</AppText>

        <AppText>🥑 Fat : 0 g</AppText>

      </AppCard>

      <SectionTitle title="Recent Products" />

      <AppCard>

        <AppText>No scanned products yet.</AppText>

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