import ProductHeader from "../../src/components/product/ProductHeader";

import NutritionCard from "../../src/components/product/NutritionCard";

import HalalFitnessCard from "../../src/components/product/HalalFitnessCard";

import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  ScrollView,
  StyleSheet,
  View,
  Image,
} from "react-native";

import {
  useLocalSearchParams,
} from "expo-router";

import Screen from "../../src/components/ui/Screen";
import AppCard from "../../src/components/ui/AppCard";
import AppText from "../../src/components/ui/AppText";

import {
  ProductRepository,
} from "../../src/database/repositories/ProductRepository";

import {
  OpenFoodFactsService,
} from "../../src/services/OpenFoodFactsService";

import {
  analyzeIngredients,
} from "../../src/engine/IngredientAnalyzer";

import { useUser } from "../../src/context/UserContext";


export default function ProductScreen() {

const { isGuest } = useUser();

  const {
    barcode,
  } =
    useLocalSearchParams<{
      barcode: string;
    }>();

  const repository =
    new ProductRepository();

  const [loading, setLoading] =
    useState(true);

  const [product, setProduct] =
    useState<any>(null);

  const ingredientAnalysis =
    useMemo(() => {



      if (
        !product?.ingredients
      ) {
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

const halalFitnessScore = useMemo(() => {

  let score = 100;

  // Haram içerik
  score -= haramIngredients.length * 40;

  // Şüpheli içerik
  score -= warningIngredients.length * 10;

  // NOVA
  if (product?.novaGroup >= 4) {

    score -= 20;

  } else if (product?.novaGroup === 3) {

    score -= 10;

  }

  // NutriScore
  switch (
    product?.nutritionGrade?.toUpperCase()
  ) {

    case "B":
      score -= 5;
      break;

    case "C":
      score -= 10;
      break;

    case "D":
      score -= 20;
      break;

    case "E":
      score -= 30;
      break;

  }

  if (score < 0) {

    score = 0;

  }

  return score;

}, [

  product,

  halalIngredients,

  warningIngredients,

  haramIngredients,

]);


  useEffect(() => {

    async function loadProduct() {

      try {

        console.log(
          "========== PRODUCT REPOSITORY =========="
        );

        console.log(
          "Aranan barkod:",
          barcode
        );

        let result =
          await repository.findByBarcode(
            barcode
          );

        let needRefresh =
          false;

        if (!result) {

          needRefresh = true;

        } else {

          if (
            !result.imageUrl ||
            result.imageUrl.length < 5
          ) {

            needRefresh = true;

          }

        }

        if (needRefresh) {

          console.log(
            "SMART SYNC BAŞLADI"
          );

          const service =
            new OpenFoodFactsService();

          const online =
            await service.getProduct(
              barcode
            );

          if (online) {

            await repository.insertProduct(
              online
            );

            result =
              await repository.findByBarcode(
                barcode
              );

            console.log(
              "SMART SYNC TAMAMLANDI"
            );

          }

        }

        console.log(
          "IMAGE =",
          result?.imageUrl
        );

        console.log(
          "NAME =",
          result?.name
        );

        console.log(
          "CATEGORY =",
          result?.category
        );

        setProduct(result);

      } catch (e) {

        console.log(e);

      }

      setLoading(false);

    }

    loadProduct();

  }, [barcode]);

  if (loading) {

    return (

      <Screen>

        <AppText>
          Yükleniyor...
        </AppText>

      </Screen>

    );

  }

  if (!product) {

    return (

      <Screen>

        <AppText>
          Ürün bulunamadı.
        </AppText>

      </Screen>

    );

  }

  return (

    <Screen>

      <ScrollView>

<ProductHeader product={product} />

        

<HalalFitnessCard
  score={halalFitnessScore}
  isGuest={isGuest}
/>
      <NutritionCard product={product} />

        <AppCard>

          <AppText style={styles.sectionTitle}>
            🧪 İçerik Analizi
          </AppText>

          {ingredientAnalysis.length === 0 ? (

            <AppText>
              Analiz edilecek içerik bulunamadı.
            </AppText>

          ) : (

            <>

              <AppText style={styles.goodTitle}>
                🟢 Güvenli İçerikler ({halalIngredients.length})
              </AppText>

              {halalIngredients.length === 0 ? (

                <AppText>Bulunamadı.</AppText>

              ) : (

                halalIngredients.map(
                  (item: any, index: number) => (

                    <AppText key={`h-${index}`}>
                      ✔ {item.info.id} - {item.info.title}
                    </AppText>

                  )
                )

              )}

              <AppText style={styles.warningTitle}>
                🟡 Kontrol Gerektirenler ({warningIngredients.length})
              </AppText>

              {warningIngredients.length === 0 ? (

                <AppText>Bulunamadı.</AppText>

              ) : (

                warningIngredients.map(
                  (item: any, index: number) => (

                    <AppText key={`w-${index}`}>
                      ⚠ {item.info.id} - {item.info.title}
                    </AppText>

                  )
                )

              )}

              <AppText style={styles.badTitle}>
                🔴 Helal Olmayanlar ({haramIngredients.length})
              </AppText>

              {haramIngredients.length === 0 ? (

                <AppText>Bulunamadı.</AppText>

              ) : (

                haramIngredients.map(
                  (item: any, index: number) => (

                    <AppText key={`b-${index}`}>
                      ✖ {item.info.id} - {item.info.title}
                    </AppText>

                  )
                )

              )}

            </>

          )}

        </AppCard>

      </ScrollView>

    </Screen>

  );

}

const styles = StyleSheet.create({

  image: {
    width: "100%",
    height: 220,
    marginBottom: 16,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 8,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  label: {
    fontWeight: "700",
  },

  goodTitle: {
    color: "#2E7D32",
    fontWeight: "700",
    marginTop: 10,
    marginBottom: 6,
  },

  warningTitle: {
    color: "#F9A825",
    fontWeight: "700",
    marginTop: 16,
    marginBottom: 6,
  },

  badTitle: {
    color: "#C62828",
    fontWeight: "700",
    marginTop: 16,
    marginBottom: 6,
  },

});

