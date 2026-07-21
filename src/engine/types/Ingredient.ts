export interface Ingredient {

  id: string;

  name: string;

  aliases: string[];

  category: string;

  halal: "yes" | "no" | "unknown" | "review";

  healthScore: number;

  vegan: boolean;

  vegetarian: boolean;

  risk: "low" | "medium" | "high";

  description: string;

}