import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
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

      <MenuItem
  icon="home"
  text="Home"
  color="#3B82F6"
  onPress={onHome}
/>

      <MenuItem
  icon="bookshelf"
  text="Library"
  color="#F59E0B"
  onPress={onLibrary}
/>

      <MenuItem
  icon="heart"
  text="Favorites"
  color="#EF4444"
  onPress={onFavorites}
/>

      <MenuItem
  icon="cog"
  text="Settings"
  color="#A1A1AA"
  onPress={onSettings}
/>

    </View>
  );
}



type ItemProps = {
  icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  text: string;
  color: string;
  onPress: () => void;
};


function MenuItem({
  icon,
  text,
  color,
  onPress,
}: ItemProps) {


  return (

    <TouchableOpacity
      style={styles.item}
      activeOpacity={0.8}
      onPress={onPress}
    >

      <MaterialCommunityIcons
        name={icon}
        size={28}
        color={color}
      />

      <AppText style={styles.text}>
        {text}
      </AppText>

    </TouchableOpacity>

  );

}

const styles = StyleSheet.create({

  container: {

    flexDirection: "row",

    justifyContent: "space-around",

    alignItems: "center",

    backgroundColor: "#0B0B0B",

    marginHorizontal: 16,

    marginBottom: 20,

    paddingVertical: 16,

    borderRadius: 28,

    borderWidth: 1.5,

    borderColor: "#7DFF3A",

    shadowColor: "#7DFF3A",

    shadowOpacity: 0.35,

    shadowRadius: 20,

    elevation: 16,

  },

  item: {

    width: 72,

    alignItems: "center",

    justifyContent: "center",

    paddingVertical: 6,

  },

  text: {

    marginTop: 6,

    color: "#FFFFFF",

    fontSize: 12,

    fontWeight: "700",

  },

});