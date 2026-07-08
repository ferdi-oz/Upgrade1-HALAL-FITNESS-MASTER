import { IngredientKnowledge } from "./IngredientKnowledge";
import { IngredientCategory } from "./IngredientCategory";
import { IngredientOrigin } from "./IngredientOrigin";

export const IngredientDatabase: IngredientKnowledge[] = [

  {
    id: "gelatin",

    name: "Gelatin",

    synonyms: [
      "Gelatine",
      "E441"
    ],

    eNumbers: [
      "E441"
    ],

    category: IngredientCategory.STABILIZER,

    possibleOrigins: [

      IngredientOrigin.ANIMAL,

      IngredientOrigin.FISH

    ],

    description:
      "Protein obtained by partial hydrolysis of collagen.",

    healthNotes: [

      "Usually safe.",

      "Origin should be verified."

    ],

    warnings: [

      "May originate from porcine sources.",

      "May originate from bovine sources."

    ],

    evidence: [

      "FAO",

      "Codex Alimentarius"

    ],

    references: [

      "Codex",

      "EFSA"

    ],

    confidence: 100
  }

];