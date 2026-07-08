import { IngredientDatabase } from "./IngredientDatabase";
import { IngredientKnowledge } from "./IngredientKnowledge";

export class KnowledgeSearch {
  static find(name: string): IngredientKnowledge | undefined {
    const query = name.trim().toLowerCase();

    return IngredientDatabase.find((ingredient) => {
      if (ingredient.name.toLowerCase() === query) {
        return true;
      }

      return ingredient.synonyms.some(
        (synonym) => synonym.toLowerCase() === query
      );
    });
  }
}