import { View, StyleSheet } from "react-native";
import AppCard from "./ui/AppCard";
import AppText from "./ui/AppText";
import { IngredientInfo } from "../database/IngredientLibrary";

type Props = {
  ingredient: IngredientInfo;
};

export default function IngredientInfoCard({
  ingredient,
}: Props) {
  const emoji =
    ingredient.status === "halal"
      ? "🟢"
      : ingredient.status === "warning"
      ? "🟡"
      : "🔴";

  return (
    <AppCard>

      <AppText
        style={styles.title}
      >
        {emoji} {ingredient.title}
      </AppText>

      <AppText>
        <AppText style={styles.label}>
          Durum:
        </AppText>{" "}
        {ingredient.status}
      </AppText>

      <AppText>
        <AppText style={styles.label}>
          Kaynak:
        </AppText>{" "}
        {ingredient.source}
      </AppText>

      <AppText>
        <AppText style={styles.label}>
          Vegan:
        </AppText>{" "}
        {ingredient.vegan ? "Evet" : "Hayır"}
      </AppText>

      <AppText>
        <AppText style={styles.label}>
          Açıklama:
        </AppText>{" "}
        {ingredient.description}
      </AppText>

      <AppText>
        <AppText style={styles.label}>
          Kullanım:
        </AppText>{" "}
        {ingredient.usage}
      </AppText>

    </AppCard>
  );
}

const styles = StyleSheet.create({

  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
  },

  label: {
    fontWeight: "700",
  },

});