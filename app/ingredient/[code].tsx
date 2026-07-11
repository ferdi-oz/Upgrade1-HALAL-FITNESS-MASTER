import { useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";

import Screen from "../../src/components/ui/Screen";
import AppCard from "../../src/components/ui/AppCard";
import AppText from "../../src/components/ui/AppText";

import {
  HALAL_INGREDIENT_DATABASE,
} from "../../src/halal/HalalIngredientDatabase";

import { Colors, Spacing, Typography } from "../../src/theme";

export default function IngredientDetailScreen() {
  const { code } = useLocalSearchParams<{ code: string }>();

  const ingredient = HALAL_INGREDIENT_DATABASE.find(
    i => i.code.toLowerCase() === (code ?? "").toLowerCase()
  );

  if (!ingredient) {
    return (
      <Screen>
        <AppCard>
          <AppText style={styles.title}>
            Katkı maddesi bulunamadı
          </AppText>
        </AppCard>
      </Screen>
    );
  }

  const statusColor =
    ingredient.status === "HALAL"
      ? "#2E7D32"
      : ingredient.status === "HARAM"
      ? "#D32F2F"
      : "#F57C00";

  return (
    <Screen>
      <AppCard>

        <AppText style={styles.code}>
          {ingredient.code}
        </AppText>

        <AppText style={styles.name}>
          {ingredient.name}
        </AppText>

        <AppText
          style={[
            styles.status,
            { color: statusColor }
          ]}
        >
          {ingredient.status}
        </AppText>

        <AppText style={styles.section}>
          Açıklama
        </AppText>

        <AppText>
          {ingredient.description}
        </AppText>

        <AppText style={styles.section}>
          Uyarı
        </AppText>

        <AppText>
          {ingredient.warning ?? "-"}
        </AppText>

      </AppCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    ...Typography.h2,
    color: Colors.error,
  },

  code: {
    ...Typography.h1,
    marginBottom: Spacing.sm,
  },

  name: {
    ...Typography.h2,
    marginBottom: Spacing.md,
  },

  status: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: Spacing.lg,
  },

  section: {
    ...Typography.h3,
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },
});