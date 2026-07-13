import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import AppText from "../ui/AppText";

type Props = {
  onHome: () => void;
  onLibrary: () => void;
  onFavorites: () => void;
  onSettings: () => void;
};

export default function BottomMenu({
  onHome,
  onLibrary,
  onFavorites,
  onSettings,
}: Props) {
  return (
    <View style={styles.container}>

      <TouchableOpacity
        style={styles.item}
        activeOpacity={0.8}
        onPress={onHome}
      >
        <AppText style={styles.icon}>🏠</AppText>
        <AppText style={styles.text}>Home</AppText>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.item}
        activeOpacity={0.8}
        onPress={onLibrary}
      >
        <AppText style={styles.icon}>📚</AppText>
        <AppText style={styles.text}>Library</AppText>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.item}
        activeOpacity={0.8}
        onPress={onFavorites}
      >
        <AppText style={styles.icon}>❤️</AppText>
        <AppText style={styles.text}>Favorites</AppText>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.item}
        activeOpacity={0.8}
        onPress={onSettings}
      >
        <AppText style={styles.icon}>⚙️</AppText>
        <AppText style={styles.text}>Settings</AppText>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",

    backgroundColor: "#0B0B0B",

    marginHorizontal: 16,
    marginBottom: 18,

    paddingVertical: 14,

    borderRadius: 28,

    borderWidth: 1.5,
    borderColor: "#7DFF3A",

    shadowColor: "#7DFF3A",
    shadowOpacity: 0.35,
    shadowRadius: 20,
    shadowOffset: {
      width: 0,
      height: 0,
    },

    elevation: 16,
  },

  item: {
    alignItems: "center",
    justifyContent: "center",
    width: 72,
  },

  icon: {
    fontSize: 25,
    marginBottom: 4,
  },

  text: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },

});