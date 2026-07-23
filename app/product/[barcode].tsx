import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  ScrollView,
  StyleSheet,
  View,
  Alert,
} from "react-native";

import {
  router,
  useLocalSearchParams,
} from "expo-router";

import Screen from "../../src/components/ui/Screen";
import AppCard from "../../src/components/ui/AppCard";
import AppText from "../../src/components/ui/AppText";

import ProductHeader from "../../src/components/product/ProductHeader";

import NutritionCard from "../../src/components/product/NutritionCard";
import HalalFitnessCard from "../../src/components/product/HalalFitnessCard";


import ProductDashboard from "../../src/components/product/sections/ProductDashboard";




import { ProductRepository } from "../../src/database/repositories/ProductRepository";
import { FavoriteRepository } from "../../src/database/repositories/FavoriteRepository";

import { ProductLookupEngine } from "../../src/product/engine/ProductLookupEngine";

import { AnalysisEngine } from "../../src/engine/analysis/AnalysisEngine";

import { useUser } from "../../src/context/UserContext";

import {
  DashboardScore,
  DashboardQuickStatus,
  DashboardStatistics,
  DashboardSummary,
  DashboardFamily,
} from "../../src/components/dashboard";

export default function ProductScreen() {




  const { barcode } = useLocalSearchParams<{
    barcode: string;
  }>();

  const { user, isGuest } = useUser();



const repository =
  new ProductRepository();



  const analysisEngine =
  new AnalysisEngine();




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



  const analysis =
  useMemo(() => {

    if (!product?.ingredients) {

      return null;

    }

    return analysisEngine.analyze(
      product.ingredients
    );

  }, [product]);

const halalScore =
  analysis?.halal.score ?? 100;

const healthScore =
  analysis?.health.score ?? 100;

const recommendations =
  Array.isArray(analysis?.recommendation)
    ? analysis.recommendation
    : analysis?.recommendation
      ? [analysis.recommendation]
      : [];


const explanations =
  analysis?.explanation ?? [];

const detectedIngredients =
  analysis?.ingredients ?? [];



const allergy =
  analysis?.allergy;


const vegan =
  analysis?.vegan;



const health =
  analysis?.health;



const halalFitnessScore =
  Math.round(

    (
      (analysis?.halal.score ?? 0) +
      (analysis?.health.score ?? 0) +
      (analysis?.vegan.score ?? 0) +
      (analysis?.allergy.score ?? 0)

    ) / 4

  );


const detectedECodes =
  analysis?.ecodes ?? [];

const halalIngredients =
  detectedIngredients.filter(
    i => i.halal === "yes"
  );

const warningIngredients =
  detectedIngredients.filter(
    i =>
      i.halal === "review" ||
      i.halal === "unknown"
  );

const haramIngredients =
  detectedIngredients.filter(
    i => i.halal === "no"
  );




  


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

<ProductDashboard
  analysis={analysis}
/>

<HalalFitnessCard
  score={halalScore}
  isGuest={isGuest}
/>

<NutritionCard
  product={product}
/>



<AppCard>

  <AppText style={styles.sectionTitle}>
    🤖 AI Recommendation
  </AppText>

  {recommendations.length === 0 ? (

    <AppText>
      No recommendation available.
    </AppText>

  ) : (

    recommendations.map(
      (item: string, index: number) => (

        <AppText
          key={index}
          style={{
            marginBottom: 8,
          }}
        >
          • {item}
        </AppText>

      )
    )

  )}

</AppCard>

<AppCard>

  <AppText style={styles.sectionTitle}>
    💡 AI Explanation
  </AppText>

  {explanations.length === 0 ? (

    <AppText>
      No explanation available.
    </AppText>

  ) : (

    explanations.map(
      (item: string, index: number) => (

        <AppText
          key={index}
          style={{
            marginBottom: 8,
          }}
        >
          • {item}
        </AppText>

      )
    )

  )}

</AppCard>



<AppCard>

  <AppText style={styles.sectionTitle}>
    🧪 Detected Ingredients
  </AppText>

  {detectedIngredients.length === 0 ? (

    <AppText>
      No ingredients detected.
    </AppText>

  ) : (

    detectedIngredients.map((item, index) => (

      <View
        key={index}
        style={{
          marginBottom: 14,
          paddingBottom: 10,
          borderBottomWidth: 1,
          borderBottomColor: "#E5E7EB",
        }}
      >

        <AppText
          style={{
            fontSize: 17,
            fontWeight: "700",
          }}
        >
          {item.name}
        </AppText>

        <AppText>
          Halal : {item.halal}
        </AppText>

        <AppText>
          Health Score : {item.healthScore}
        </AppText>

        <AppText>
          Risk : {item.risk}
        </AppText>

        <AppText
          style={{
            marginTop: 4,
            color: "#666",
          }}
        >
          {item.description}
        </AppText>

      </View>

    ))

  )}

</AppCard>


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
    🧬 Detected E-Codes
  </AppText>

  {detectedECodes.length === 0 ? (

    <AppText>
      No E-Codes detected.
    </AppText>

  ) : (

    detectedECodes.map((item, index) => (

      <View
        key={index}
        style={{
          marginBottom: 14,
          paddingBottom: 10,
          borderBottomWidth: 1,
          borderBottomColor: "#E5E7EB",
        }}
      >

        <AppText
          style={{
            fontSize: 17,
            fontWeight: "700",
            marginBottom: 4,
          }}
        >
          {item.code}
        </AppText>

        <AppText>
          {item.name}
        </AppText>

        <AppText>
          Halal : {item.halal}
        </AppText>

        <AppText>
          Health Score : {item.healthScore}
        </AppText>

        <AppText>
          Risk : {item.risk}
        </AppText>

        <AppText
          style={{
            marginTop: 4,
            color: "#666",
          }}
        >
          {item.description}
        </AppText>

      </View>

    ))

  )}

</AppCard>

<AppCard>

  <AppText style={styles.sectionTitle}>
    🚨 Allergy Analysis
  </AppText>

  {!allergy ? (

    <AppText>
      No allergy analysis available.
    </AppText>

  ) : (

    <>

      <AppText
        style={{
          fontWeight: "700",
          fontSize: 17,
          marginBottom: 8,
        }}
      >
        Risk : {allergy.risk}
      </AppText>

      <AppText
        style={{
          marginBottom: 12,
        }}
      >
        Safety Score : {allergy.score}/100
      </AppText>

      {allergy.warnings.length === 0 ? (

        <AppText
          style={{
            color: "#2E7D32",
          }}
        >
          ✅ No allergens detected.
        </AppText>

      ) : (

        allergy.warnings.map(
          (warning: string, index: number) => (

            <AppText
              key={index}
              style={{
                color: "#C62828",
                marginBottom: 6,
              }}
            >
              • {warning}
            </AppText>

          )
        )

      )}

    </>

  )}




</AppCard>

<AppCard>

  <AppText style={styles.sectionTitle}>
    🌱 Vegan Analysis
  </AppText>

  {!vegan ? (

    <AppText>
      No vegan analysis available.
    </AppText>

  ) : (

    <>

      <AppText
        style={{
          fontWeight: "700",
          fontSize: 17,
          marginBottom: 8,
        }}
      >
        Vegan :
        {vegan.vegan ? " Yes" : " No"}
      </AppText>

      <AppText
        style={{
          marginBottom: 12,
        }}
      >
        Vegan Score :
        {vegan.score}/100
      </AppText>

      {vegan.warnings.length === 0 ? (

        <AppText
          style={{
            color: "#2E7D32",
          }}
        >
          ✅ Suitable for vegans.
        </AppText>

      ) : (

        vegan.warnings.map(
          (warning: string, index: number) => (

            <AppText
              key={index}
              style={{
                color: "#C62828",
                marginBottom: 6,
              }}
            >
              • {warning}
            </AppText>

          )
        )

      )}

    </>

  )}




</AppCard>

<AppCard>

  <AppText style={styles.sectionTitle}>
    ❤️ Health Summary
  </AppText>

  {!health ? (

    <AppText>
      No health analysis available.
    </AppText>

  ) : (

    <>

      <AppText
        style={{
          fontWeight: "700",
          fontSize: 17,
          marginBottom: 8,
        }}
      >
        Health Score : {health.score}/100
      </AppText>

      {health.warnings.length === 0 ? (

        <AppText
          style={{
            color: "#2E7D32",
          }}
        >
          ✅ No health concerns detected.
        </AppText>

      ) : (

        health.warnings.map(
          (warning: string, index: number) => (

            <AppText
              key={index}
              style={{
                color: "#C62828",
                marginBottom: 6,
              }}
            >
              • {warning}
            </AppText>

          )
        )

      )}

    </>

  )}




</AppCard>

<AppCard>

  <AppText style={styles.sectionTitle}>
    🏆 Final AI Decision
  </AppText>

  <AppText
    style={{
      fontSize: 22,
      fontWeight: "700",
      marginBottom: 14,


      color:
  (analysis?.halal.score ?? 0) >= 80 &&
  (analysis?.health.score ?? 0) >= 70
    ? "#2E7D32"
    : (analysis?.halal.score ?? 0) >= 50
    ? "#F9A825"
    : "#C62828",


    }}
  >

    {(analysis?.halal.score ?? 0) >= 80 &&
(analysis?.health.score ?? 0) >= 70


      ? "🟢 HALAL & HEALTHY"


     : (analysis?.halal.score ?? 0) >= 50


      ? "🟡 NEEDS REVIEW"
      : "🔴 NOT RECOMMENDED"}
  </AppText>

  <AppText>
    Halal Score : {analysis?.halal.score}/100
  </AppText>

  <AppText>
    Health Score : {analysis?.health.score}/100
  </AppText>

  <AppText>
    Vegan :
    {analysis?.vegan?.vegan ? " YES" : " NO"}
  </AppText>

  <AppText>
    Allergy Risk :
    {analysis?.allergy?.risk.toUpperCase()}
  </AppText>




</AppCard>

<AppCard>

  <AppText style={styles.sectionTitle}>
    ⭐ HALAL FITNESS SCORE
  </AppText>

  <AppText
    style={{
      fontSize: 42,
      fontWeight: "700",
      textAlign: "center",
      color:
        halalFitnessScore >= 80
          ? "#2E7D32"
          : halalFitnessScore >= 60
          ? "#F9A825"
          : "#C62828",
      marginBottom: 10,
    }}
  >
    {halalFitnessScore}
  </AppText>

  <AppText
    style={{
      textAlign: "center",
      fontSize: 18,
      fontWeight: "700",
      marginBottom: 18,
    }}
  >
    /100
  </AppText>

  <AppText
    style={{
      textAlign: "center",
      fontSize: 26,
      marginBottom: 12,
    }}
  >
    {halalFitnessScore >= 90
      ? "★★★★★"
      : halalFitnessScore >= 75
      ? "★★★★☆"
      : halalFitnessScore >= 60
      ? "★★★☆☆"
      : halalFitnessScore >= 40
      ? "★★☆☆☆"
      : "★☆☆☆☆"}
  </AppText>

  <AppText
    style={{
      textAlign: "center",
      fontSize: 18,
      fontWeight: "700",
    }}
  >
    {halalFitnessScore >= 90
      ? "Excellent Product"
      : halalFitnessScore >= 75
      ? "Good Choice"
      : halalFitnessScore >= 60
      ? "Average Product"
      : halalFitnessScore >= 40
      ? "Needs Attention"
      : "Avoid Product"}
  </AppText>




</AppCard>

<AppCard>

  <AppText style={styles.sectionTitle}>
    📄 PRODUCT REPORT
  </AppText>

  <AppText>
    Product :
    {" "}
    {product?.name ?? "-"}
  </AppText>

  <AppText>
    Barcode :
    {" "}
    {product?.barcode ?? "-"}
  </AppText>

  <AppText>
    Halal Score :
    {" "}
    {analysis?.halal.score ?? 0}/100
  </AppText>

  <AppText>
    Health Score :
    {" "}
    {analysis?.health.score ?? 0}/100
  </AppText>

  <AppText>
    Vegan :
    {" "}
    {analysis?.vegan?.vegan ? "YES" : "NO"}
  </AppText>

  <AppText>
    Allergy Risk :
    {" "}
    {analysis?.allergy?.risk ?? "-"}
  </AppText>

  <AppText>
    Ingredients :
    {" "}
    {analysis?.ingredients.length ?? 0}
  </AppText>

  <AppText>
    E-Codes :
    {" "}
    {analysis?.ecodes.length ?? 0}
  </AppText>

  <AppText>
    HALAL FITNESS SCORE :
    {" "}
    {halalFitnessScore}/100
  </AppText>



<AppText
  style={{
    marginTop: 16,
    fontWeight: "700",
  }}
>
  🤖 AI Nutrition Summary
</AppText>

<AppText
  style={{
    marginTop: 8,
    color: "#555",
    lineHeight: 22,
  }}
>
  {analysis?.nutritionSummary}
</AppText>




<AppText
  style={{
    marginTop: 20,
    fontWeight: "700",
  }}
>
  👨‍👩‍👧 Family Recommendation
</AppText>

<AppText
  style={{
    marginTop: 8,
    color: "#1565C0",
    lineHeight: 22,
  }}
>
  {analysis?.familyRecommendation}
</AppText>



</AppCard>




<AppCard>

  <AppText style={styles.sectionTitle}>
    📊 PRODUCT STATISTICS
  </AppText>

  <AppText>
    Ingredients :
    {" "}
    {analysis?.ingredients.length ?? 0}
  </AppText>

  <AppText>
    E-Codes :
    {" "}
    {analysis?.ecodes.length ?? 0}
  </AppText>

  <AppText>
    Halal Score :
    {" "}
    {analysis?.halal.score ?? 0}%
  </AppText>

  <AppText>
    Health Score :
    {" "}
    {analysis?.health.score ?? 0}%
  </AppText>

  <AppText>
    Vegan :
    {" "}
    {analysis?.vegan?.vegan ? "YES" : "NO"}
  </AppText>

  <AppText>
    Allergy Risk :
    {" "}
    {analysis?.allergy?.risk ?? "-"}
  </AppText>

</AppCard>




<View
  style={{
    marginTop: 20,
  }}
>

  <AppText
    style={{
      fontWeight: "700",
      marginBottom: 8,
    }}
  >
    ⭐ Overall HALAL FITNESS SCORE
  </AppText>

  <View
    style={{
      height: 16,
      backgroundColor: "#E0E0E0",
      borderRadius: 8,
      overflow: "hidden",
    }}
  >

    <View
      style={{
        width: `${halalFitnessScore}%`,
        height: "100%",
        backgroundColor:
          halalFitnessScore >= 80
            ? "#43A047"
            : halalFitnessScore >= 60
            ? "#F9A825"
            : "#E53935",
      }}
    />

  </View>

  <AppText
    style={{
      marginTop: 8,
      textAlign: "center",
      fontWeight: "700",
      fontSize: 18,
    }}
  >
    {halalFitnessScore}/100
  </AppText>

</View>




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

