export interface Ingredient {
  id: string;

  code?: string;

  name: string;

  description?: string;

  aliases: string[];

  origin?: string;
}