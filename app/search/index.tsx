import { useState } from "react";
import {
  StyleSheet,
  TextInput,
} from "react-native";

import Screen from "../../src/components/ui/Screen";
import AppText from "../../src/components/ui/AppText";

export default function SearchScreen() {

  const [search, setSearch] = useState("");

  return (
    <Screen>

      <AppText style={styles.title}>
        🔍 Ürün Ara
      </AppText>

      <TextInput
        style={styles.input}
        placeholder="Ürün veya marka yaz..."
        value={search}
        onChangeText={setSearch}
      />

      <AppText>
        Aranan:
      </AppText>

      <AppText>
        {search}
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

  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },

});
