import ingredients from "../data/ingredients.json";
import ecodes from "../data/ecodes.json";

import { Ingredient } from "../types/Ingredient";
import { ECode } from "../types/ECode";


export class IngredientEngine {
  private readonly database: Ingredient[];

private readonly ecodeDatabase: ECode[];


  constructor() {
  this.database = ingredients as Ingredient[];

  this.ecodeDatabase = ecodes as ECode[];
}



  find(name: string): Ingredient | null {
    const search = name.trim().toLowerCase();

    return (
      this.database.find(item =>
        item.aliases.some(alias => alias.toLowerCase() === search)
      ) ?? null
    );
  }


findECode(code: string): ECode | null {

  const search = code
    .trim()
    .toUpperCase();

  return (
    this.ecodeDatabase.find(
      item => item.code.toUpperCase() === search
    ) ?? null
  );

}


    analyze(names: string[]): Ingredient[] {
    return names
      .map(name => this.find(name))
      .filter((item): item is Ingredient => item !== null);
  }

  analyzeECodes(codes: string[]): ECode[] {
    return codes
      .map(code => this.findECode(code))
      .filter((item): item is ECode => item !== null);
  }
}


