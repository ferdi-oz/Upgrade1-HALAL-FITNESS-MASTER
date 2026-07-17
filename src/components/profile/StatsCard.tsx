import React from "react";
import { View, StyleSheet } from "react-native";

import AppCard from "../ui/AppCard";
import AppText from "../ui/AppText";

interface Props {
  scanned?: number;
  favorites?: number;
  history?: number;
}

export default function StatsCard({

  scanned = 0,
  favorites = 0,
  history = 0,

}: Props) {

  return (

    <AppCard style={styles.card}>

      <AppText style={styles.title}>
        📊 Statistics
      </AppText>

      <View style={styles.row}>

        <View style={styles.box}>

          <AppText style={styles.number}>
            {scanned}
          </AppText>

          <AppText>
            Scanned
          </AppText>

        </View>

        <View style={styles.box}>

          <AppText style={styles.number}>
            {favorites}
          </AppText>

          <AppText>
            Favorites
          </AppText>

        </View>

        <View style={styles.box}>

          <AppText style={styles.number}>
            {history}
          </AppText>

          <AppText>
            History
          </AppText>

        </View>

      </View>

    </AppCard>

  );

}

const styles = StyleSheet.create({

  card: {
    marginTop: 16,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  box: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 16,
    marginHorizontal: 4,
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
  },

  number: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2E7D32",
    marginBottom: 6,
  },

});