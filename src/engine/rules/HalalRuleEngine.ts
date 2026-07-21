import { Ingredient } from "../types/Ingredient";

import { ECode } from "../types/ECode";

import { HalalRuleResult } from "./HalalRuleResult";

export class HalalRuleEngine {

  analyze(
    ingredients: Ingredient[],
    ecodes: ECode[]
  ): HalalRuleResult {

    let score = 100;

    const reasons: string[] = [];

    let status: "halal" | "review" | "haram" = "halal";

    for (const ingredient of ingredients) {

      if (ingredient.halal === "no") {

        status = "haram";

        score = 0;

        reasons.push(
          ingredient.name + " is haram."
        );

      }

      else if (ingredient.halal === "review") {

        if (status !== "haram") {

          status = "review";

        }

        score -= 20;

        reasons.push(
          ingredient.name + " requires review."
        );

      }

    }

    for (const ecode of ecodes) {

      if (ecode.halal === "review") {

        if (status === "halal") {

          status = "review";

        }

        score -= 10;

        reasons.push(

          ecode.code + " requires review."

        );

      }

    }

    if (score < 0) {

      score = 0;

    }

    return {

      score,

      status,

      reasons

    };

  }

}
