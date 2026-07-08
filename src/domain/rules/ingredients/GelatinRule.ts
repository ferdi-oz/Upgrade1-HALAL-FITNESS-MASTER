import { IIngredientRule } from "../../interfaces/IIngredientRule";
import { Ingredient } from "../../models/Ingredient";
import { IngredientAnalysisResult } from "../../models/IngredientAnalysisResult";
import { HalalStatus } from "../../valueObjects/HalalStatus";

export class GelatinRule implements IIngredientRule {
  readonly ingredientName = "Gelatin";

  evaluate(
    ingredient: Ingredient
  ): IngredientAnalysisResult {
    return {
      ingredientName: ingredient.name,
      status: HalalStatus.UNDER_REVIEW,
      confidence: 0,
      reason: `${ingredient.name} rule is not implemented yet.`,
      evidence: [],
      warnings: [],
    };
  }
}