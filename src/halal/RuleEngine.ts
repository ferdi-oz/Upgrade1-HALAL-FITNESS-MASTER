import universal from "./rules/universal.json";

import { IngredientClassifier } from "./IngredientClassifier";

import { IngredientAnalysis } from "./models";

export class RuleEngine {

  static analyzeIngredients(
    ingredients: string[]
  ): IngredientAnalysis[] {

    return ingredients.map((ingredient) => {

      const result =
        IngredientClassifier.classify(ingredient);

      return {

        ingredient,

        status: result.status,

        reason: result.reason,

      };

    });

  }

}
