import { HalalStatus } from "./models";

export interface IngredientResult {

  status: HalalStatus;

  reason: string;

}

export class IngredientClassifier {

  static classify(name: string): IngredientResult {

    const ingredient = name.trim().toLowerCase();

    const haram = [
      "e120",
      "carmine",
      "cochineal",
      "lard",
      "pork",
      "ham",
      "bacon",
      "wine",
      "alcohol"
    ];

    const suspicious = [
      "gelatin",
      "gelatine",
      "e471",
      "e472",
      "emulsifier",
      "flavour",
      "flavor",
      "natural flavor"
    ];

    if (haram.includes(ingredient)) {
      return {
        status: "HARAM",
        reason: "Known haram ingredient."
      };
    }

    if (suspicious.includes(ingredient)) {
      return {
        status: "SUSPICIOUS",
        reason: "Source must be verified."
      };
    }

    return {
      status: "HALAL",
      reason: "No known issue."
    };

  }

}
