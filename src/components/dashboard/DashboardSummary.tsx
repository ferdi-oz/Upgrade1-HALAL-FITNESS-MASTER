import React from "react";
import { StyleSheet } from "react-native";

import AppCard from "@/src/components/ui/AppCard";
import AppText from "@/src/components/ui/AppText";

type Props = {
  summary: string;
};

export default function DashboardSummary({
  summary,
}: Props) {

  return (

    <AppCard>

      <AppText style={styles.title}>
        AI SUMMARY
      </AppText>

      <AppText style={styles.summary}>
        {summary}
      </AppText>

    </AppCard>

  );

}

const styles = StyleSheet.create({

  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },

  summary: {
    fontSize: 15,
    lineHeight: 24,
    color: "#444",
  },

});