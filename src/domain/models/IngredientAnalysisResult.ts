import { HalalStatus } from "../valueObjects/HalalStatus";

export interface IngredientAnalysisResult {
  ingredientName: string;

  status: HalalStatus;

  confidence: number;

  reason: string;

  evidence: string[];

  warnings: string[];
}