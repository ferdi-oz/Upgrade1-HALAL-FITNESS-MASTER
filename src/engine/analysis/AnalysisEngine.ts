import { IngredientPipeline } from "../pipeline/IngredientPipeline";
import { RecommendationEngine } from "./RecommendationEngine";
import { ExplainEngine } from "./ExplainEngine";

export class AnalysisEngine {

  private readonly pipeline =
    new IngredientPipeline();

  private readonly recommendation =
    new RecommendationEngine();

  private readonly explain =
    new ExplainEngine();

  analyze(text: string) {

    const result =
      this.pipeline.process(text);

    return {

      parsed: result.parsed,

      normalized: result.normalized,

      ingredients: result.ingredients,

      ecodes: result.ecodes,

      halal: result.halal,

      health: result.health,

      vegan: result.vegan,

      allergy: result.allergy,

      explanation:
        this.explain.explain(
          result.ingredients
        ),

      recommendation:
        this.recommendation.recommend(
          result.halal.score,
          result.health.score
        )

    };

  }

}