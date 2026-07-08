import { useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";

import AppText from "../../src/components/ui/AppText";
import Screen from "../../src/components/ui/Screen";
import { Spacing } from "../../src/theme";

export default function ProductScreen() {
  const { barcode } = useLocalSearchParams<{ barcode: string }>();

  return (
    <Screen>
      <AppText style={styles.title}>Ürün Detayı</AppText>
      <AppText>Taranan barkod: {barcode}</AppText>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: Spacing.md,
  },
});