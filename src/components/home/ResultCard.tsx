import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

import AppText from "../ui/AppText";

type Props = {

  visible: boolean;

  productName: string;

  brand: string;

  image: string;

  halal: "halal" | "haram" | "unknown";

  nutritionScore: number;

  onAnalyze: () => void;

};

export default function ResultCard({

  visible,

  productName,

  brand,

  image,

  halal,

  nutritionScore,

  onAnalyze,

}: Props) {

  if (!visible) {
    return null;
  }
  return (

    <View style={styles.container}>

      <Image
        source={{ uri: image }}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={styles.info}>

        <AppText style={styles.productName}>
          {productName}
        </AppText>

        <AppText style={styles.brand}>
          {brand}
        </AppText>

        <View style={styles.statusRow}>

          <View
            style={[
              styles.badge,

              halal === "halal"
                ? styles.green

                : halal === "haram"
                ? styles.red

                : styles.orange,
            ]}
          >

            <AppText style={styles.badgeText}>

              {halal === "halal"
                ? "✅ HALAL"

                : halal === "haram"
                ? "❌ HARAM"

                : "⚠️ CHECK"}

            </AppText>

          </View>

          <View style={styles.scoreBox}>

            <AppText style={styles.scoreTitle}>
              Nutrition
            </AppText>

            <AppText style={styles.score}>
              {nutritionScore}/100
            </AppText>

          </View>

        </View>
          <TouchableOpacity
            style={styles.aiButton}
            activeOpacity={0.9}
            onPress={onAnalyze}
          >
            <AppText style={styles.aiButtonText}>
              🤖 AI Analysis
            </AppText>
          </TouchableOpacity>

        </View>

    </View>

  );

}

const styles = StyleSheet.create({

  container: {

    marginHorizontal: 18,

    marginBottom: 20,

    backgroundColor: "#111111",

    borderRadius: 24,

    padding: 18,

    borderWidth: 1.5,

    borderColor: "#7DFF3A",

    flexDirection: "row",

    shadowColor: "#7DFF3A",

    shadowOpacity: 0.35,

    shadowRadius: 16,

    elevation: 12,
  },

  image: {

    width: 95,

    height: 95,

    borderRadius: 16,

    backgroundColor: "#1B1B1B",
  },

  info: {

    flex: 1,

    marginLeft: 16,
  },

  productName: {

    color: "#FFFFFF",

    fontSize: 20,

    fontWeight: "700",
  },

  brand: {

    color: "#AAAAAA",

    marginTop: 4,

    fontSize: 14,
  },

  statusRow: {

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    marginTop: 18,
  },
  badge: {

    paddingHorizontal: 14,

    paddingVertical: 8,

    borderRadius: 18,

    minWidth: 110,

    alignItems: "center",
  },

  badgeText: {

    color: "#FFFFFF",

    fontSize: 13,

    fontWeight: "700",
  },

  green: {

    backgroundColor: "#2ECC71",
  },

  red: {

    backgroundColor: "#E74C3C",
  },

  orange: {

    backgroundColor: "#F39C12",
  },

  scoreBox: {

    alignItems: "center",
  },

  scoreTitle: {

    color: "#AAAAAA",

    fontSize: 12,
  },

  score: {

    color: "#7DFF3A",

    fontSize: 22,

    fontWeight: "800",

    marginTop: 2,
  },

  aiButton: {

    marginTop: 22,

    backgroundColor: "#7DFF3A",

    borderRadius: 18,

    paddingVertical: 14,

    alignItems: "center",

    shadowColor: "#7DFF3A",

    shadowOpacity: 0.40,

    shadowRadius: 14,

    elevation: 10,
  },

  aiButtonText: {

    color: "#050505",

    fontSize: 16,

    fontWeight: "800",
  },

});