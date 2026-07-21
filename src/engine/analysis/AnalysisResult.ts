export interface AnalysisResult {

  halalScore: number;

  healthScore: number;

  allergenScore: number;

  nutritionScore: number;

  overallScore: number;

  halalStatus:
    | "halal"
    | "review"
    | "haram";

  warnings: string[];

}
