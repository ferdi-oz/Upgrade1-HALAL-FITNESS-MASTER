import { AnalysisResult } from "./AnalysisResult";
import { IngredientAnalysisResult } from "./IngredientAnalysisResult";

export interface ProductAnalysisResult {
  productName: string;

  ingredientResults: IngredientAnalysisResult[];

  analysis: AnalysisResult;
}