import { HalalAnalysisResult } from "./models";
import { RuleEngine } from "./RuleEngine";

export class HalalEngine {

  static analyze(
    ingredients: string[]
  ): HalalAnalysisResult {

    if (!ingredients || ingredients.length === 0) {

      return {

        status: "SUSPICIOUS",

        score: 0,

        reasons: [
          "Kaynağı belirtilmediği için doğrulanması gerekir."
        ],

        ingredients: []

      };

    }

    const result =
      RuleEngine.analyzeIngredients(ingredients);

    const hasHaram =
      result.some(i => i.status === "HARAM");

    if (hasHaram) {

      return {

        status: "HARAM",

        score: 0,

        reasons: result
          .filter(i => i.status === "HARAM")
          .map(i => i.reason),

        ingredients: result

      };

    }

    const hasSuspicious =
      result.some(i => i.status === "SUSPICIOUS");

    if (hasSuspicious) {

      return {

        status: "SUSPICIOUS",

        score: 50,

        reasons: [
          "Kaynağı belirtilmediği için doğrulanması gerekir."
        ],

        ingredients: result

      };

    }

    return {

      status: "HALAL",

      score: 100,

      reasons: [
        "İçerikte helalliğe aykırı olduğu bilinen bir madde tespit edilmemiştir."
      ],

      ingredients: result

    };

  }

}
