import { IIngredientRule } from "../interfaces/IIngredientRule";
import { GelatinRule } from "../rules/ingredients/GelatinRule";

export class IngredientRuleRegistry {
  private static rules: IIngredientRule[] = [
    new GelatinRule(),
  ];

  static getRules(): IIngredientRule[] {
    return this.rules;
  }
}