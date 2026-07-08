import { IngredientAlias } from "./IngredientAlias";
import { IngredientNormalizer } from "./IngredientNormalizer";

export class IngredientMatcher {

  static match(input: string): string {

    const normalized = IngredientNormalizer.normalize(input);

    return IngredientAlias[normalized] ?? normalized;

  }

}