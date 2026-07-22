import { IngredientPipeline } from "../pipeline/IngredientPipeline";

export class AnalysisEngine {

  private readonly pipeline =
    new IngredientPipeline();

  analyze(text: string) {

    const result =
      this.pipeline.process(text);

    return {

      halalScore:
        result.halal.score,

      healthScore:
        result.health.score,

      vegan:
        result.vegan.vegan,

      allergyWarnings:
        result.allergy.warnings,

      halalWarnings:
        result.halal.warnings,

      healthWarnings:
        result.health.warnings,

      ingredients:
        result.ingredients,

      ecodes:
        result.ecodes,

    };

  }

}