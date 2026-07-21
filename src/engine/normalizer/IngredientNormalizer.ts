export class IngredientNormalizer {

  normalize(value: string): string {

    return value

      .trim()

      .replace(/\s+/g, " ")

      .replace(/\[[^\]]*\]/g, "")

      .replace(/\([^)]*\)/g, "")

      .replace(/e[\s\-]?(\d+[a-z]?)/gi, "E$1")

      .trim();

  }

  normalizeMany(values: string[]): string[] {

    return values
      .map(value => this.normalize(value))
      .filter(value => value.length > 0);

  }

}