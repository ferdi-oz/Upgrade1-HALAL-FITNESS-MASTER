import { router } from "expo-router";
import { useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  TextInput,
} from "react-native";

import AppCard from "../../src/components/ui/AppCard";
import AppText from "../../src/components/ui/AppText";
import Screen from "../../src/components/ui/Screen";

import {
  HALAL_INGREDIENT_DATABASE,
  HalalIngredient,
} from "../../src/halal/HalalIngredientDatabase";

import { Colors, Spacing, Typography } from "../../src/theme";

export default function LibraryScreen() {
  const [search, setSearch] = useState("");

  const data = useMemo(() => {
    const q = search.trim().toLowerCase();

    if (!q) return HALAL_INGREDIENT_DATABASE;

    return HALAL_INGREDIENT_DATABASE.filter(
      (item) =>
        item.code.toLowerCase().includes(q) ||
        item.name.toLowerCase().includes(q)
    );
  }, [search]);

  function statusColor(status: HalalIngredient["status"]) {
    switch (status) {
      case "HALAL":
        return "#2E7D32";
      case "HARAM":
        return "#D32F2F";
      default:
        return "#F57C00";
    }
  }

  return (
    <Screen>
      <FlatList
        contentContainerStyle={styles.container}
        data={data}
        keyExtractor={(item) => item.code}
        ListHeaderComponent={
          <>
            <AppText style={styles.title}>
              Helal Katkı Maddeleri
            </AppText>

            <TextInput
              style={styles.input}
              placeholder="E471, Gelatin, E120..."
              value={search}
              onChangeText={setSearch}
            />
          </>
        }
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              router.push({
  pathname: "/ingredient/[code]",
  params: {
    code: item.code,
  },
})
            }
          >
            <AppCard>
              <AppText style={styles.code}>
                {item.code}
              </AppText>

              <AppText style={styles.name}>
                {item.name}
              </AppText>

              <AppText
                style={{
                  color: statusColor(item.status),
                  fontWeight: "700",
                }}
              >
                {item.status}
              </AppText>

              <AppText>
                {item.description}
              </AppText>
            </AppCard>
          </Pressable>
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.lg,
    paddingBottom: 40,
  },

  title: {
    ...Typography.h1,
    marginBottom: Spacing.md,
  },

  input: {
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: Spacing.lg,
  },

  code: {
    fontWeight: "700",
    fontSize: 18,
  },

  name: {
    fontSize: 16,
    marginBottom: 6,
  },
});