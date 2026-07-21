import React from "react";
import { StyleSheet } from "react-native";

import Screen from "../src/components/ui/Screen";
import AppText from "../src/components/ui/AppText";

export default function IngredientGalleryScreen() {

  return (

    <Screen>

      <AppText style={styles.title}>
        Ingredient Gallery
      </AppText>

      <AppText>
        Gallery OCR will be added here.
      </AppText>

    </Screen>

  );

}

const styles = StyleSheet.create({

  title: {

    fontSize: 26,

    fontWeight: "700",

    marginBottom: 20,

  },

});