import { HALAL_INGREDIENT_DATABASE } from "./HalalIngredientDatabase";
import { IngredientClassifier } from "./IngredientClassifier";
import { IngredientAnalysis } from "./models";

export class RuleEngine {

  static analyzeIngredients(
    ingredients: string[]
  ): IngredientAnalysis[] {

    const analyses: IngredientAnalysis[] = [];

    for (const ingredient of ingredients) {

      const text = ingredient.toUpperCase();

      const databaseMatch =
        HALAL_INGREDIENT_DATABASE.find(item =>
          text.includes(item.code.toUpperCase()) ||
          text.includes(item.name.toUpperCase())
        );

      if (databaseMatch) {

        analyses.push({

          ingredient,

          status: databaseMatch.status,

          reason:
            databaseMatch.warning ??
            databaseMatch.description

        });

        continue;

      }

      const result =
        IngredientClassifier.classify(ingredient);

      analyses.push({

        ingredient,

        status: result.status,

        reason: result.reason

      });

    }

    return analyses;

  }

}