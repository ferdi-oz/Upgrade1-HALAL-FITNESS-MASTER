import { IngredientDatabase } from "./IngredientDatabase";
import { IngredientKnowledge } from "./IngredientKnowledge";

export class IngredientRepository {

  static getAll(): IngredientKnowledge[] {

    return IngredientDatabase;

  }

}