export type HalalStatus =
  | "HALAL"
  | "HARAM"
  | "SUSPICIOUS";

export interface IngredientAnalysis {

  ingredient: string;

  status: HalalStatus;

  reason: string;

}

export interface HalalAnalysisResult {

  status: HalalStatus;

  score: number;

  reasons: string[];

  ingredients: IngredientAnalysis[];

}
