import { IngredientCategory } from "./IngredientCategory";
import { IngredientOrigin } from "./IngredientOrigin";

export interface IngredientKnowledge {
  id: string;

  name: string;

  synonyms: string[];

  eNumbers: string[];

  category: IngredientCategory;

  possibleOrigins: IngredientOrigin[];

  vegan: boolean;

  vegetarian: boolean;

  halalPossible: boolean;

  kosherPossible: boolean;

  description: string;

  healthNotes: string[];

  warnings: string[];

  allergens: string[];

  evidence: string[];

  references: string[];

  confidence: number;
}