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

    vegan: false,

    vegetarian: false,

    halalPossible: true,

    kosherPossible: true,

    description:
      "Protein obtained by partial hydrolysis of collagen.",

    healthNotes: [
      "Generally considered safe.",
      "Origin should be verified."
    ],

    warnings: [
      "May originate from porcine sources.",
      "May originate from bovine sources."
    ],

    allergens: [],

    evidence: [
      "Codex Alimentarius",
      "FAO"
    ],

    references: [
      "Codex",
      "EFSA"
    ],

    confidence: 100
  }
];