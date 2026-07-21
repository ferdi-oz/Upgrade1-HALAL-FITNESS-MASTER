export interface IngredientDictionaryItem {

  id: string;

  canonical: string;

  synonyms: string[];

  halalRisk: "halal" | "haram" | "doubtful";

  healthRisk: "low" | "medium" | "high";

}

export const IngredientDictionary: IngredientDictionaryItem[] = [

];