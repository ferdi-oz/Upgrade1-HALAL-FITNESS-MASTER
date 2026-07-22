import { HalalAnalyzer } from "../analyzers/HalalAnalyzer";
import { HealthAnalyzer } from "../analyzers/HealthAnalyzer";
import { VeganAnalyzer } from "../analyzers/VeganAnalyzer";
import { AllergyAnalyzer } from "../analyzers/AllergyAnalyzer";



import { IngredientParser } from "../parser/IngredientParser";
import { IngredientNormalizer } from "../normalizer/IngredientNormalizer";
import { IngredientEngine } from "../ingredients/IngredientEngine";

export class IngredientPipeline {

  private readonly parser = new IngredientParser();

  private readonly normalizer = new IngredientNormalizer();

  private readonly engine = new IngredientEngine();



private readonly halal =
  new HalalAnalyzer();

private readonly health =
  new HealthAnalyzer();

private readonly vegan =
  new VeganAnalyzer();

private readonly allergy =
  new AllergyAnalyzer();



  process(text: string) {

    const parsed =
      this.parser.parse(text);

    const normalized =
      this.normalizer.normalizeMany(parsed);

    const ingredients =
      this.engine.analyze(normalized);

    const ecodes =
      this.engine.analyzeECodes(normalized);

    return {

  parsed,

  normalized,

  ingredients,

  ecodes,

  halal:
    this.halal.analyze(ingredients),

  health:
    this.health.analyze(ingredients),

  vegan:
    this.vegan.analyze(ingredients),

  allergy:
    this.allergy.analyze(ingredients),

};

  }

}