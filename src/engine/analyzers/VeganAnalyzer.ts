import { Ingredient } from "../types/Ingredient";

export class VeganAnalyzer {

  analyze(
    ingredients: Ingredient[]
  ) {

    const nonVegan =
      ingredients.filter(
        item => !item.vegan
      );

    return {

      vegan:
        nonVegan.length === 0,

      score:
        nonVegan.length === 0 ? 100 : 0,

      warnings:
        nonVegan.map(
          item =>
            `${item.name} is not vegan.`
        )

    };

  }

}