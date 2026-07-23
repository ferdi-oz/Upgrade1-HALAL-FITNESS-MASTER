import React from "react";
import { View, StyleSheet } from "react-native";

import AppCard from "@/src/components/ui/AppCard";
import AppText from "@/src/components/ui/AppText";

type Props = {
  halal: boolean;
  healthy: boolean;
  vegan: boolean;
  allergyRisk: boolean;
};

export default function DashboardQuickStatus({
  halal,
  healthy,
  vegan,
  allergyRisk,
}: Props) {

  const Item = ({
    ok,
    title,
  }: {
    ok: boolean;
    title: string;
  }) => (
    <View style={styles.row}>

      <AppText
        style={{
          color: ok
            ? "#2E7D32"
            : "#C62828",
          fontWeight: "700",
        }}
      >
        {ok ? "✅" : "⚠️"}
      </AppText>

      <AppText style={styles.text}>
        {title}
      </AppText>

    </View>
  );

  return (

    <AppCard>

      <AppText style={styles.title}>
        QUICK STATUS
      </AppText>

      <Item
        ok={halal}
        title="Halal"
      />

      <Item
        ok={healthy}
        title="Healthy"
      />

      <Item
        ok={vegan}
        title="Vegan"
      />

      <Item
        ok={!allergyRisk}
        title="Allergy Safe"
      />

    </AppCard>

  );

}

const styles = StyleSheet.create({

  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 14,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  text: {
    marginLeft: 10,
    fontSize: 16,
  },

});