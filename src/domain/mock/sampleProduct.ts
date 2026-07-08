import { Product } from "../models/Product";
import { Ingredient } from "../models/Ingredient";

export const sampleProduct: Product = {
  barcode: "1234567890123",
  name: "Sample Chocolate",
  brand: "Halal Fitness",

  ingredients: [
    {
      name: "Sugar",
    } as Ingredient,

    {
      name: "Gelatin",
    } as Ingredient,

    {
      name: "Cocoa Butter",
    } as Ingredient,
  ],
};