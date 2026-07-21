import { Ingredient } from "../types/Ingredient";

export class HealthAnalyzer {

  analyze(
    ingredients: Ingredient[]
  ) {

    if (ingredients.length === 0) {

      return {

        score: 100,

        warnings: [],

      };

    }

    const total =
      ingredients.reduce(

        (sum, item) =>

          sum + item.healthScore,

        0

      );

    const score =
      Math.round(

        total / ingredients.length

      );

    const warnings =
      ingredients

        .filter(

          i => i.healthScore < 50

        )

        .map(

          i =>

            `${i.name} may reduce health score.`

        );

    return {

      score,

      warnings,

    };

  }

}