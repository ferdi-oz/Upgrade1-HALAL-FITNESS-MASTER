import React, { useEffect, useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Alert,
} from "react-native";

import { router, useLocalSearchParams } from "expo-router";

import Screen from "../../src/components/ui/Screen";
import AppCard from "../../src/components/ui/AppCard";
import AppText from "../../src/components/ui/AppText";

import ProductHeader from "../../src/components/product/ProductHeader";
import NutritionCard from "../../src/components/product/NutritionCard";
import HalalFitnessCard from "../../src/components/product/HalalFitnessCard";

import { ProductRepository } from "../../src/database/repositories/ProductRepository";
import { FavoriteRepository } from "../../src/database/repositories/FavoriteRepository";

import { ProductLookupEngine } from "../../src/product/engine/ProductLookupEngine";

import { analyzeIngredients } from "../../src/engine/IngredientAnalyzer";

import { useUser } from "../../src/context/UserContext";

export default function ProductScreen() {

  const { barcode } = useLocalSearchParams<{
    barcode: string;
  }>();

  const { user, isGuest } = useUser();

  const repository = new ProductRepository();

  const favoriteRepository =
    new FavoriteRepository();

  const [loading, setLoading] =
    useState(true);

  const [product, setProduct] =
    useState<any>(null);

  const [isFavorite, setIsFavorite] =
    useState(false);

  useEffect(() => {

    loadProduct();

  }, [barcode]);

  async function loadProduct() {

    try {

      setLoading(true);

      let result =
        await repository.findByBarcode(
          barcode
        );

      let needRefresh = false;

      if (!result) {

        needRefresh = true;

      } else if (
        !result.imageUrl ||
        result.imageUrl.length < 5
      ) {

        needRefresh = true;

      }

      if (needRefresh) {

       const lookup =
  await ProductLookupEngine.lookup(
    barcode
  );

if (lookup.found && lookup.product) {

  await repository.insertProduct(
    lookup.product
  );

  result =
    await repository.findByBarcode(
      barcode
    );

}

      }

      if (!result) {

        setProduct(null);

        return;

      }

      setProduct(result);

      if (!isGuest && user) {

        const fav =
          await favoriteRepository.isFavorite(
            user.id,
            result.id
          );

        setIsFavorite(fav);

      }

    } catch (e) {

      console.log(e);

      Alert.alert(
        "Error",
        "Product could not be loaded."
      );

    } finally {

      setLoading(false);

    }

  }

  const ingredientAnalysis =
    useMemo(() => {

      if (!product?.ingredients) {

        return [];

      }

      return analyzeIngredients(
        product.ingredients
      );

    }, [product]);

  const halalIngredients =
    ingredientAnalysis.filter(
      (x: any) =>
        x.info.status === "halal"
    );

  const warningIngredients =
    ingredientAnalysis.filter(
      (x: any) =>
        x.info.status === "warning"
    );

  const haramIngredients =
    ingredientAnalysis.filter(
      (x: any) =>
        x.info.status === "haram"
    );

  const halalFitnessScore =
    useMemo(() => {

      let score = 100;

      score -=
        haramIngredients.length * 40;

      score -=
        warningIngredients.length * 10;

      if (score < 0)
        score = 0;

      return score;

    }, [
      halalIngredients,
      warningIngredients,
      haramIngredients,
    ]);


  if (loading) {

    return (

      <Screen>

        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >

          <AppText
            style={{
              fontSize: 20,
              fontWeight: "700",
            }}
          >
            Loading...
          </AppText>

        </View>

      </Screen>

    );

  }

  if (!product) {

    return (

      <Screen>

        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 25,
          }}
        >

          <AppText
            style={{
              fontSize: 24,
              fontWeight: "700",
              marginBottom: 12,
            }}
          >
            Product not found
          </AppText>

          <AppText
            style={{
              textAlign: "center",
              marginBottom: 30,
            }}
          >
            This product was not found in the local database or OpenFoodFacts.
          </AppText>

          <AppCard>

            <AppText
              onPress={() => router.replace("/(tabs)")}
              style={{
                fontSize: 18,
                fontWeight: "700",
                textAlign: "center",
                padding: 12,
              }}
            >
              ← Back
            </AppText>

          </AppCard>

        </View>

      </Screen>

    );

  }

  return (

    <Screen>

      <View
        style={styles.header}
      >

        <AppText
          onPress={() => {

            if (router.canGoBack()) {

              router.back();

            } else {

              router.replace("/(tabs)");

            }

          }}
          style={styles.back}
        >
          ←
        </AppText>

        <AppText
          style={styles.headerTitle}
        >
          Product
        </AppText>

        <View
          style={{
            width: 30,
          }}
        />

      </View>

      <ScrollView
        style={{
          flex: 1,
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 80,
        }}
      >

        <ProductHeader
          product={product}
        />

        <HalalFitnessCard
          score={halalFitnessScore}
          isGuest={isGuest}
        />

        <NutritionCard
          product={product}
        />

        <AppCard>

          <AppText
            onPress={async () => {

              if (isGuest) {

                Alert.alert(
                  "Members Only",
                  "Favorites are available only for registered users."
                );

                return;

              }

              if (isFavorite) {

                await favoriteRepository.removeFavorite(
                  user!.id,
                  product.id
                );

                setIsFavorite(false);

              } else {

                await favoriteRepository.addFavorite(
                  user!.id,
                  product.id,
                  product.barcode
                );

                setIsFavorite(true);

              }

            }}
            style={{
              fontSize: 18,
              fontWeight: "700",
              textAlign: "center",
              paddingVertical: 12,
            }}
          >
            {isFavorite
              ? "❤️ Remove from Favorites"
              : "🤍 Add to Favorites"}
          </AppText>

        </AppCard>

        <AppCard>

          <AppText style={styles.sectionTitle}>
            🧪 Ingredient Analysis
          </AppText>

          <AppText style={styles.goodTitle}>
            🟢 Safe Ingredients ({halalIngredients.length})
          </AppText>

          {halalIngredients.map((item: any, index: number) => (

            <AppText key={`h-${index}`}>
              ✔ {item.info.id} - {item.info.title}
            </AppText>

          ))}

          <AppText style={styles.warningTitle}>
            🟡 Warning ({warningIngredients.length})
          </AppText>

          {warningIngredients.map((item: any, index: number) => (

            <AppText key={`w-${index}`}>
              ⚠ {item.info.id} - {item.info.title}
            </AppText>

          ))}

          <AppText style={styles.badTitle}>
            🔴 Haram ({haramIngredients.length})
          </AppText>

          {haramIngredients.map((item: any, index: number) => (

            <AppText key={`b-${index}`}>
              ✖ {item.info.id} - {item.info.title}
            </AppText>

          ))}

        </AppCard>

        <View style={{ height: 30 }} />

      </ScrollView>

    </Screen>

  );

}


const styles = StyleSheet.create({

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
  },

  back: {
    fontSize: 30,
    fontWeight: "700",
    width: 30,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 14,
  },

  goodTitle: {
    color: "#2E7D32",
    fontSize: 17,
    fontWeight: "700",
    marginTop: 12,
    marginBottom: 8,
  },

  warningTitle: {
    color: "#F9A825",
    fontSize: 17,
    fontWeight: "700",
    marginTop: 16,
    marginBottom: 8,
  },

  badTitle: {
    color: "#C62828",
    fontSize: 17,
    fontWeight: "700",
    marginTop: 16,
    marginBottom: 8,
  },

});

