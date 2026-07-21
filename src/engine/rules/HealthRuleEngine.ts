import { Ingredient } from "../types/Ingredient";
import { ECode } from "../types/ECode";
import { HealthRuleResult } from "./HealthRuleResult";

export class HealthRuleEngine {

  analyze(
    ingredients: Ingredient[],
    ecodes: ECode[]
  ): HealthRuleResult {

    let score = 100;

    const warnings: string[] = [];

    for (const ingredient of ingredients) {

      score -= (100 - ingredient.healthScore) / 4;

      if (ingredient.risk === "high") {

        warnings.push(
          ingredient.name + " is high risk."
        );

      }

      else if (ingredient.risk === "medium") {

        warnings.push(
          ingredient.name + " should be consumed in moderation."
        );

      }

    }

    for (const ecode of ecodes) {

      score -= (100 - ecode.healthScore) / 6;

      if (ecode.risk === "high") {

        warnings.push(
          ecode.code + " is high risk."
        );

      }

      else if (ecode.risk === "medium") {

        warnings.push(
          ecode.code + " should be reviewed."
        );

      }

    }

    if (score < 0) {

      score = 0;

    }

    return {

      score: Math.round(score),

      warnings

    };

  }

}
