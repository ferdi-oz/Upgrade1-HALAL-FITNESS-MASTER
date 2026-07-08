import { IngredientCategory } from "./IngredientCategory";
import { IngredientOrigin } from "./IngredientOrigin";

export interface IngredientKnowledge {
  id: string;

  name: string;

  synonyms: string[];

  eNumbers: string[];

  category: IngredientCategory;

  possibleOrigins: IngredientOrigin[];

  description: string;

  healthNotes: string[];

  warnings: string[];

  evidence: string[];

  references: string[];

  confidence: number;
}