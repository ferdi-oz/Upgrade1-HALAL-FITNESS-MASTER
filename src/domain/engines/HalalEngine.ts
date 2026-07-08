import { Ingredient } from "../models/Ingredient";
import { AnalysisResult } from "../models/AnalysisResult";
import { HalalStatus } from "../valueObjects/HalalStatus";
import { IngredientRuleRegistry } from "../registry/IngredientRuleRegistry";

export class HalalEngine {
  analyze(ingredients: Ingredient[]): AnalysisResult {
    const rules = IngredientRuleRegistry.getRules();

    const ingredientResults = [];

    for (const ingredient of ingredients) {
      const rule = rules.find(
        (r) =>
          r.ingredientName.toLowerCase() ===
          ingredient.name.toLowerCase()
      );

      if (rule) {
        ingredientResults.push(rule.evaluate(ingredient));
      }
    }

    return {
      status: HalalStatus.UNDER_REVIEW,
      confidence: 0,
      summary: `${ingredientResults.length} ingredient(s) analyzed.`,
      evidence: [],
      warnings: [],
    };
  }
}