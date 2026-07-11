import { useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native";

import AppCard from "../../src/components/ui/AppCard";
import AppText from "../../src/components/ui/AppText";
import Screen from "../../src/components/ui/Screen";

import { Colors, Spacing, Typography } from "../../src/theme";

import { ProductRepository } from "../../src/database/repositories/ProductRepository";
import { Product } from "../../src/domain/models/Product";
import { OpenFoodFactsService } from "../../src/services/OpenFoodFactsService";
import { HalalEngine } from "../../src/halal/HalalEngine";
export default function ProductScreen() {
  const { barcode } = useLocalSearchParams<{ barcode: string }>();

  const [loading, setLoading] = useState(true);

  const [product, setProduct] = useState<Product | null>(null);

  const analysis = useMemo(() => {
    if (!product) return null;

    return HalalEngine.analyze(product.ingredients);
  }, [product]);


  useEffect(() => {
    async function loadProduct() {
      if (!barcode) {
        setLoading(false);
        return;
      }

      const repository = new ProductRepository();

      let result = await repository.findByBarcode(barcode);
console.log(
  "SQLITE SONUCU:",
  result ? `BULUNDU -> ${result.name}` : "BULUNAMADI"
);

      
      if (!result) {
console.log("OpenFoodFacts çağrılıyor...");

  console.log("1 - Service oluşturuluyor");

  const service = new OpenFoodFactsService();

  console.log("2 - getProduct çağrılıyor");

  const onlineProduct = await service.getProduct(barcode);

  console.log("3 - getProduct tamamlandı");

  console.log("OpenFoodFacts sonucu:", onlineProduct);

  if (onlineProduct) {
    await repository.insertProduct(onlineProduct);

    result = await repository.findByBarcode(barcode);
  }
}

      setProduct(result);

      setLoading(false);
    }

    loadProduct();
  }, [barcode]);

  const halalStatus = useMemo(() => {
    if (!product) return null;

    return product.certifications.includes("Halal");
  }, [product]);
  if (loading) {
    return (
      <Screen>
        <View style={styles.center}>
          <ActivityIndicator size="large" color={Colors.primary} />

          <AppText style={styles.loadingText}>
            Ürün bilgileri yükleniyor...
          </AppText>
        </View>
      </Screen>
    );
  }

  if (!product) {
    return (
      <Screen>
        <View style={styles.center}>
          <AppCard style={styles.notFoundCard}>
            <AppText style={styles.notFoundTitle}>Ürün Bulunamadı</AppText>

            <AppText style={styles.label}>Barkod</AppText>

            <AppText style={styles.value}>{barcode}</AppText>

            <AppText style={styles.notFoundMessage}>
              Bu ürün henüz yerel veritabanında bulunmuyor.
            </AppText>
          </AppCard>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <AppCard>
          <AppText style={styles.sectionTitle}>
            Helal Durumu
          </AppText>

          <AppText
            style={{
              fontSize: 22,
              fontWeight: "700",
              color:
                analysis?.status === "HALAL"
                  ? "#2E7D32"
                  : analysis?.status === "HARAM"
                  ? "#D32F2F"
                  : "#F57C00",
            }}
          >
            {analysis?.status}
          </AppText>

          {analysis?.reasons.map((reason, index) => (
            <AppText key={index}>
              • {reason}
            </AppText>
          ))}
        </AppCard>
        <AppText style={styles.productName}>🌿 {product.name}</AppText>

        <AppText style={styles.barcode}>Barkod: {product.barcode}</AppText>
        <AppCard>
          <AppText style={styles.sectionTitle}>🏢 Marka</AppText>

          <AppText style={styles.sectionValue}>{product.brand || "-"}</AppText>
        </AppCard>

        <AppCard>
          <AppText style={styles.sectionTitle}>📦 Kategori</AppText>

          <AppText style={styles.sectionValue}>
            {product.category || "-"}
          </AppText>
        </AppCard>

        <AppCard>
          <AppText style={styles.sectionTitle}>🌍 Ülkeler</AppText>

          <AppText style={styles.sectionValue}>
            {product.countries.length > 0 ? product.countries.join(", ") : "-"}
          </AppText>
        </AppCard>

        <AppCard>
          <AppText style={styles.sectionTitle}>🌿 Sertifikalar</AppText>

          <AppText style={styles.sectionValue}>
            {product.certifications.length > 0
              ? product.certifications.join(", ")
              : "Sertifika bilgisi yok"}
          </AppText>
        </AppCard>
        <AppCard>
          <AppText style={styles.sectionTitle}>🧾 İçindekiler</AppText>

          {product.ingredients.length > 0 ? (
            product.ingredients.map((ingredient, index) => (
              <AppText key={index} style={styles.ingredient}>
                ✔ {ingredient}
              </AppText>
            ))
          ) : (
            <AppText style={styles.sectionValue}>
              İçerik bilgisi bulunmuyor.
            </AppText>
          )}
        </AppCard>

        <AppCard
          style={[
            styles.statusCard,

            {
              backgroundColor: halalStatus
                ? Colors.primaryLight
                : Colors.warning,
            },
          ]}
        >
          <AppText style={styles.statusTitle}>
            {halalStatus ? "🟢 Helal Durumu" : "🟡 Sertifika Durumu"}
          </AppText>

          <AppText style={styles.statusText}>
            {halalStatus
              ? "Bu ürün kayıtlı sertifikaya göre helal olarak işaretlenmiştir."
              : "Bu ürün için doğrulanmış helal sertifikası bulunmuyor."}
          </AppText>
        </AppCard>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.lg,
    paddingBottom: 40,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.lg,
  },

  loadingText: {
    marginTop: Spacing.md,
    color: Colors.textSecondary,
  },

  productName: {
    ...Typography.h1,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },

  barcode: {
    color: Colors.textSecondary,
    marginBottom: Spacing.lg,
  },

  notFoundCard: {
    width: "100%",
  },

  notFoundTitle: {
    ...Typography.h2,
    color: Colors.error,
    marginBottom: Spacing.md,
  },
  notFoundMessage: {
    marginTop: Spacing.md,
    color: Colors.textSecondary,
    lineHeight: 22,
  },

  label: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: Spacing.md,
    marginBottom: 4,
  },

  value: {
    ...Typography.body,
    color: Colors.textPrimary,
  },

  sectionTitle: {
    ...Typography.h3,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },

  sectionValue: {
    ...Typography.body,
    color: Colors.textPrimary,
  },

  ingredient: {
    ...Typography.body,
    color: Colors.textPrimary,
    marginBottom: 6,
    lineHeight: 22,
  },
  statusCard: {
    borderLeftWidth: 6,
    borderLeftColor: Colors.primary,
    marginTop: Spacing.sm,
  },

  statusTitle: {
    ...Typography.h3,
    color: Colors.white,
    marginBottom: Spacing.sm,
  },

  statusText: {
    ...Typography.body,
    color: Colors.white,
    lineHeight: 24,
  },
});
