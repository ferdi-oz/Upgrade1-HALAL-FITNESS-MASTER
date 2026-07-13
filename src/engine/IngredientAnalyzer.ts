import {
  IngredientInfo,
  IngredientLibrary,
} from "../database/IngredientLibrary";

export type IngredientMatch = {

  ingredient: string;

  info: IngredientInfo;

};

export function analyzeIngredients(
  ingredients: string[]
): IngredientMatch[] {

  const matches: IngredientMatch[] = [];

  for (const ingredient of ingredients) {

    const text = ingredient.toLowerCase();

    for (const item of IngredientLibrary) {

      const found = item.names.some(
        (name) =>
          text.includes(
            name.toLowerCase()
          )
      );

      if (found) {

        matches.push({

          ingredient,

          info: item,

        });

        break;

      }

    }

  }

  return matches;

}