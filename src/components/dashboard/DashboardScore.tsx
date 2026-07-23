import React from "react";
import { View, StyleSheet } from "react-native";



import AppCard from "@/src/components/ui/AppCard";
import AppText from "@/src/components/ui/AppText";



type Props = {
  score: number;
};

export default function DashboardScore({
  score,
}: Props) {

  const title =
    score >= 90
      ? "Excellent Product"
      : score >= 75
      ? "Good Product"
      : score >= 50
      ? "Average Product"
      : "Poor Product";

  const color =
    score >= 90
      ? "#2E7D32"
      : score >= 75
      ? "#66BB6A"
      : score >= 50
      ? "#F9A825"
      : "#C62828";

  return (
    <AppCard>

      <View style={styles.container}>

        <AppText style={styles.label}>
          HALAL FITNESS SCORE
        </AppText>

        <AppText
          style={[
            styles.score,
            { color },
          ]}
        >
          {score}
        </AppText>

        <AppText
          style={[
            styles.title,
            { color },
          ]}
        >
          {title}
        </AppText>

      </View>

    </AppCard>
  );

}

const styles = StyleSheet.create({

  container: {
    alignItems: "center",
    paddingVertical: 20,
  },

  label: {
    fontSize: 15,
    fontWeight: "700",
    color: "#666",
    marginBottom: 12,
  },

  score: {
    fontSize: 54,
    fontWeight: "800",
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 8,
  },

});