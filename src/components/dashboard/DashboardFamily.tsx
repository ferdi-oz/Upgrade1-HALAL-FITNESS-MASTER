import React from "react";
import { View, StyleSheet } from "react-native";

import AppCard from "@/src/components/ui/AppCard";
import AppText from "@/src/components/ui/AppText";

type Props = {
  recommendation: string;
};

export default function DashboardFamily({
  recommendation,
}: Props) {

  return (

    <AppCard>

      <AppText style={styles.title}>
        FAMILY RECOMMENDATION
      </AppText>

      <View style={styles.box}>

        <AppText style={styles.text}>
          {recommendation}
        </AppText>

      </View>

    </AppCard>

  );

}

const styles = StyleSheet.create({

  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },

  box: {
    backgroundColor: "#F8F8F8",
    borderRadius: 12,
    padding: 14,
  },

  text: {
    fontSize: 15,
    lineHeight: 24,
    color: "#444",
  },

});