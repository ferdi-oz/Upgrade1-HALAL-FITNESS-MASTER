import { Ingredient } from "../models/Ingredient";
import { IngredientAnalysisResult } from "../models/IngredientAnalysisResult";

export interface IIngredientRule {
  readonly ingredientName: string;

  evaluate(
    ingredient: Ingredient
  ): IngredientAnalysisResult;
}