import { Ingredient } from "../types/Ingredient";

export class AllergyAnalyzer {

  private readonly allergens = [

    "milk",
    "egg",
    "soy",
    "peanut",
    "nuts",
    "almond",
    "hazelnut",
    "walnut",
    "sesame",
    "mustard",
    "celery",
    "gluten",
    "wheat",
    "fish",
    "shellfish",
    "crustacean"

  ];

  analyze(
    ingredients: Ingredient[]
  ) {

    const warnings: string[] = [];

    for (const item of ingredients) {

      const text =
        (
          item.name +
          " " +
          item.description
        ).toLowerCase();

      for (const allergen of this.allergens) {

        if (text.includes(allergen)) {

          warnings.push(
            `${item.name} may contain ${allergen}.`
          );

        }

      }

    }

    return {

      score:
        warnings.length === 0 ? 100 : 40,

      risk:
        warnings.length === 0
          ? "low"
          : "high",

      warnings

    };

  }

}