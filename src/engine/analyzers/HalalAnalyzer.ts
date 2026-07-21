import { Ingredient } from "../types/Ingredient";

export class HalalAnalyzer {

  analyze(
    ingredients: Ingredient[]
  ) {

    let score = 100;

    const warnings: string[] = [];

    for (const item of ingredients) {

      switch (item.halal) {

        case "no":

          score -= 60;

          warnings.push(
            `${item.name} is not halal.`
          );

          break;

        case "review":

          score -= 20;

          warnings.push(
            `${item.name} needs review.`
          );

          break;

        case "unknown":

          score -= 10;

          warnings.push(
            `${item.name} origin unknown.`
          );

          break;

      }

    }

    score = Math.max(score, 0);

    return {

      score,

      warnings,

    };

  }

}