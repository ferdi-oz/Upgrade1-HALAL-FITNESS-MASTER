import { IngredientRepository } from "../domain/knowledge/IngredientRepository";
import { IngredientMatcher } from "../domain/knowledge/IngredientMatcher";
import { IngredientKnowledge } from "../domain/knowledge/IngredientKnowledge";

export class IngredientSearchService {

  static find(name: string): IngredientKnowledge | undefined {

    const search = IngredientMatcher.match(name);

    return IngredientRepository.getAll().find((ingredient) => {

      if (ingredient.id === search) {

        return true;

      }

      if (ingredient.name.toLowerCase() === search) {

        return true;

      }

      return ingredient.synonyms.some(

        synonym => synonym.toLowerCase() === search

      );

    });

  }

}