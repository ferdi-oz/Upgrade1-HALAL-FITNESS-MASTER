export class IngredientNormalizer {

  static normalize(value: string): string {

    return value
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ")
      .replace(/-/g, "");
  }

}