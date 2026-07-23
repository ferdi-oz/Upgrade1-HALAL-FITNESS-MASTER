import React from "react";
import { View, StyleSheet } from "react-native";

import AppCard from "@/src/components/ui/AppCard";
import AppText from "@/src/components/ui/AppText";

type Props = {
  ingredientCount: number;
  eCodeCount: number;
  warningCount: number;
  benefitCount: number;
};

export default function DashboardStatistics({
  ingredientCount,
  eCodeCount,
  warningCount,
  benefitCount,
}: Props) {

  const Stat = ({
    value,
    label,
  }: {
    value: number;
    label: string;
  }) => (

    <View style={styles.item}>

      <AppText style={styles.value}>
        {value}
      </AppText>

      <AppText style={styles.label}>
        {label}
      </AppText>

    </View>

  );

  return (

    <AppCard>

      <AppText style={styles.title}>
        PRODUCT STATISTICS
      </AppText>

      <View style={styles.grid}>

        <Stat
          value={ingredientCount}
          label="Ingredients"
        />

        <Stat
          value={eCodeCount}
          label="E-Codes"
        />

        <Stat
          value={warningCount}
          label="Warnings"
        />

        <Stat
          value={benefitCount}
          label="Benefits"
        />

      </View>

    </AppCard>

  );

}

const styles = StyleSheet.create({

  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 16,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  item: {
    width: "48%",
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: "center",
  },

  value: {
    fontSize: 28,
    fontWeight: "800",
    color: "#2E7D32",
  },

  label: {
    marginTop: 6,
    fontSize: 14,
    color: "#666",
  },

});