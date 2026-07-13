import { useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";

import {
  analyzeIngredients,
} from "../../src/engine/IngredientAnalyzer";

import {
  ActivityIndicator,
  Image,
  ScrollView,
  Share,
  StyleSheet,
  View,
  Pressable,
} from "react-native";


import Screen from "../../src/components/ui/Screen";
import AppCard from "../../src/components/ui/AppCard";
import AppText from "../../src/components/ui/AppText";


import {
  Colors,
  Spacing,
  Typography,
} from "../../src/theme";


import {
  ProductRepository,
} from "../../src/database/repositories/ProductRepository";


import {
  Product,
} from "../../src/domain/models/Product";


import {
  OpenFoodFactsService,
} from "../../src/services/OpenFoodFactsService";


import {
  HalalEngine,
} from "../../src/halal/HalalEngine";


import {
  formatCategory,
  formatCountry,
} from "../../src/utils/OpenFoodFactsFormatter";



export default function ProductScreen() {


  const {
    barcode
  } =
  useLocalSearchParams<{
    barcode:string;
  }>();


  const [loading,setLoading]
  =
  useState(true);


 
const [product, setProduct] =
  useState<any>();

const ingredientAnalysis = useMemo(() => {

  if (!product?.ingredients) {
    return [];
  }

  return analyzeIngredients(
    product.ingredients
  );

}, [product]);


  useState<Product | null>(null);


  const [favorite,setFavorite]
  =
  useState(false);


  const [imageLoading,setImageLoading]
  =
  useState(true);


  const analysis = useMemo(() => {

    if (!product) return null;

    return HalalEngine.analyze(
      product.ingredients
    );

  }, [product]);


  useEffect(() => {

    async function loadProduct() {

      if (!barcode) {

        setLoading(false);

        return;

      }

      const repository =
        new ProductRepository();

      let result =
        await repository.findByBarcode(
          barcode
        );

      const needRefresh =
        !result ||
        !result.imageUrl ||
        result.imageUrl.trim() === "" ||
        !result.category ||
        result.category.trim() === "";

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

      setLoading(false);

    }

    loadProduct();

  }, [barcode]);


  const halalStatus = useMemo(() => {

    if (!product)
      return false;

    return product.certifications.includes(
      "Halal"
    );

  }, [product]);


  async function shareProduct() {

    if (!product)
      return;

    await Share.share({

      message:
        `${product.name}\n\n` +
        `Barcode: ${product.barcode}`

    });

  }

  if (loading) {

    return (

      <Screen>

        <View style={styles.center}>

          <ActivityIndicator
            size="large"
            color={Colors.primary}
          />

          <AppText
            style={styles.loadingText}
          >

            Ürün yükleniyor...

          </AppText>

        </View>

      </Screen>

    );

  }


  if (!product) {

    return (

      <Screen>

        <View style={styles.center}>

          <AppCard
            style={styles.notFoundCard}
          >

            <AppText
              style={styles.notFoundTitle}
            >

              Ürün Bulunamadı

            </AppText>

            <AppText
              style={styles.label}
            >

              Barkod

            </AppText>

            <AppText
              style={styles.value}
            >

              {barcode}

            </AppText>

            <AppText
              style={styles.notFoundMessage}
            >

              Bu ürün veritabanında bulunamadı.

            </AppText>

          </AppCard>

        </View>

      </Screen>

    );

  }


  return (

    <Screen>

<AppCard>

 <AppText
  style={{
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
  }}
>


    🧪 İçerik Analizi
  </AppText>

  {ingredientAnalysis.length === 0 ? (

    <AppText>
      Analiz edilecek içerik bulunamadı.
    </AppText>

  ) : (

    ingredientAnalysis.map((item, index) => (

      <View
        key={index}
        style={{ marginTop: 10 }}
      >

        <AppText>

          {item.info.status === "halal"
            ? "🟢"
            : item.info.status === "warning"
            ? "🟡"
            : "🔴"}

          {" "}

          {item.info.id}

        </AppText>

        <AppText>

          {item.info.description}

        </AppText>

        <AppText>

          Kaynak:

          {" "}

          {item.info.source}

        </AppText>

      </View>

    ))

  )}

</AppCard>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >

        <AppCard>

          <AppText
            style={styles.sectionTitle}
          >

            🟢 Helal Analizi

          </AppText>

          <AppText
            style={{
              fontSize: 24,
              fontWeight: "700",
              color:
                analysis?.status === "HALAL"
                  ? "#2E7D32"
                  : analysis?.status === "HARAM"
                  ? "#D32F2F"
                  : "#F9A825",
            }}
          >

            {analysis?.status}

          </AppText>

          {analysis?.reasons.map(
            (reason, index) => (

              <AppText key={index}>

                • {reason}

              </AppText>

            )
          )}

        </AppCard>



        {!!product.imageUrl && (

          <Image

            source={{
              uri: product.imageUrl
            }}

            style={styles.productImage}

            resizeMode="contain"

            onLoadEnd={() =>
              setImageLoading(false)
            }

          />

        )}


        {imageLoading &&
          product.imageUrl && (

            <ActivityIndicator
              size="small"
              color={Colors.primary}
            />

        )}



        <AppText
          style={styles.productName}
        >

          {product.name}

        </AppText>

        <AppText
          style={styles.barcode}
        >

          Barkod: {product.barcode}

        </AppText>

        <AppCard>

          <AppText style={styles.sectionTitle}>
            🏢 Marka
          </AppText>

          <AppText style={styles.sectionValue}>
            {product.brand || "-"}
          </AppText>

        </AppCard>


        <AppCard>

          <AppText style={styles.sectionTitle}>
            📦 Kategori
          </AppText>

          <AppText style={styles.sectionValue}>
            {formatCategory(product.category || "-")}
          </AppText>

        </AppCard>


        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >

          <AppCard
            style={{
              flex: 1,
              marginRight: 6,
              alignItems: "center",
            }}
          >

            <AppText
              style={{
                fontWeight: "700",
                marginBottom: 6,
              }}
            >
              NutriScore
            </AppText>

            <AppText
              style={{
                fontSize: 28,
                color: "#2E7D32",
              }}
            >
              {(product.nutritionGrade || "-").toUpperCase()}
            </AppText>

            <AppText
              style={{
                textAlign: "center",
                fontSize: 12,
              }}
            >
              Beslenme kalitesi
            </AppText>

          </AppCard>


          <AppCard
            style={{
              flex: 1,
              marginHorizontal: 6,
              alignItems: "center",
            }}
          >

            <AppText
              style={{
                fontWeight: "700",
                marginBottom: 6,
              }}
            >
              NOVA
            </AppText>

            <AppText
              style={{
                fontSize: 28,
                color: "#EF6C00",
              }}
            >
              {product.novaGroup ?? "-"}
            </AppText>

            <AppText
              style={{
                textAlign: "center",
                fontSize: 12,
              }}
            >
              İşlenme seviyesi
            </AppText>

          </AppCard>


          <AppCard
            style={{
              flex: 1,
              marginLeft: 6,
              alignItems: "center",
            }}
          >

            <AppText
              style={{
                fontWeight: "700",
                marginBottom: 6,
              }}
            >
              EcoScore
            </AppText>

            <AppText
              style={{
                fontSize: 28,
                color: "#388E3C",
              }}
            >
              {(product.ecoScore || "-").toUpperCase()}
            </AppText>

            <AppText
              style={{
                textAlign: "center",
                fontSize: 12,
              }}
            >
              Çevresel etki
            </AppText>

          </AppCard>

        </View>


        <AppCard>

          <AppText style={styles.sectionTitle}>
            🌍 Ülkeler
          </AppText>

          <AppText style={styles.sectionValue}>

            {product.countries.length > 0
              ? product.countries
                  .map(formatCountry)
                  .join("\n")
              : "-"}

          </AppText>

        </AppCard>

        <AppCard>

          <AppText style={styles.sectionTitle}>
            📜 Sertifikalar
          </AppText>

          <AppText style={styles.sectionValue}>

            {product.certifications.length > 0
              ? product.certifications.join("\n")
              : "Doğrulanmış sertifika bulunmuyor."}

          </AppText>

        </AppCard>


        <AppCard>

          <AppText style={styles.sectionTitle}>
            🧾 İçindekiler
          </AppText>

          {product.ingredients.length > 0 ? (

            product.ingredients.map(
  (item: string, index: number) => (

              <AppText
                key={index}
                style={styles.ingredient}
              >

                ✔ {item}

              </AppText>

            ))

          ) : (

            <AppText style={styles.sectionValue}>

              İçerik bilgisi bulunamadı.

            </AppText>

          )}

        </AppCard>



        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
            marginBottom: 20,
          }}
        >

          <Pressable
            onPress={() =>
              setFavorite(!favorite)
            }
            style={{ flex: 1 }}
          >

            <AppCard
              style={{
                alignItems: "center",
                marginRight: 6,
              }}
            >

              <AppText
                style={{ fontSize: 30 }}
              >

                {favorite ? "❤️" : "🤍"}

              </AppText>

              <AppText>

                Favori

              </AppText>

            </AppCard>

          </Pressable>



          <Pressable
            onPress={shareProduct}
            style={{ flex: 1 }}
          >

            <AppCard
              style={{
                alignItems: "center",
                marginHorizontal: 6,
              }}
            >

              <AppText
                style={{ fontSize: 30 }}
              >

                📤

              </AppText>

              <AppText>

                Paylaş

              </AppText>

            </AppCard>

          </Pressable>



          <AppCard
            style={{
              flex: 1,
              marginLeft: 6,
              alignItems: "center",
            }}
          >

            <AppText
              style={{ fontSize: 30 }}
            >

              🤖

            </AppText>

            <AppText>

              AI Bilgi

            </AppText>

          </AppCard>

        </View>



        <AppCard>

          <AppText style={styles.sectionTitle}>
            🤖 AI Bilgi Kartı
          </AppText>

          <AppText style={styles.sectionValue}>

            Bu yardımcı internet veya API kullanmaz.

          </AppText>

          <AppText style={styles.sectionValue}>

            • Helal içerik hakkında bilgi verir.

          </AppText>

          <AppText style={styles.sectionValue}>

            • E kodlarını açıklar.

          </AppText>

          <AppText style={styles.sectionValue}>

            • Alerjenleri yorumlar.

          </AppText>

          <AppText style={styles.sectionValue}>

            • NutriScore, NOVA ve EcoScore hakkında bilgi verir.

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

  productImage: {
    width: 220,
    height: 220,
    alignSelf: "center",
    marginBottom: 20,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
  },

  productName: {
    ...Typography.h1,
    color: Colors.textPrimary,
    textAlign: "center",
    marginBottom: Spacing.sm,
  },

  barcode: {
    color: Colors.textSecondary,
    textAlign: "center",
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
    lineHeight: 22,
  },

  ingredient: {
    ...Typography.body,
    color: Colors.textPrimary,
    marginBottom: 6,
    lineHeight: 22,
  },

});