import React from "react";
import { View, StyleSheet } from "react-native";

import AppCard from "../ui/AppCard";
import AppText from "../ui/AppText";

type Props = {
  product: any;
};

export default function NutritionCard({
  product,
}: Props) {
  return (
    <AppCard>

      <AppText style={styles.title}>
        Nutrition
      </AppText>

      <Row
        label="NutriScore"
        value={
          product.nutritionGrade
            ? product.nutritionGrade.toUpperCase()
            : "-"
        }
      />

      <Row
        label="NOVA"
        value={product.novaGroup || "-"}
      />

      <Row
        label="EcoScore"
        value={
          product.ecoScore
            ? product.ecoScore.toUpperCase()
            : "-"
        }
      />

    </AppCard>
  );
}

function Row({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <View style={styles.row}>
      <AppText style={styles.label}>
        {label}
      </AppText>

      <AppText>
        {value}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({

  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 6,
  },

  label: {
    fontWeight: "600",
  },

});