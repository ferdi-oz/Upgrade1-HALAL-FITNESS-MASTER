import { IngredientParser } from "../parser/IngredientParser";
import { IngredientNormalizer } from "../normalizer/IngredientNormalizer";
import { IngredientEngine } from "../ingredients/IngredientEngine";

export class IngredientPipeline {

  private readonly parser = new IngredientParser();

  private readonly normalizer = new IngredientNormalizer();

  private readonly engine = new IngredientEngine();

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

      ecodes

    };

  }

}