import { Product } from "../models/Product";

export const sampleProduct: Product = {
  id: "sample-001",

  barcode: "1234567890123",

  name: "Sample Chocolate",

  brand: "Halal Fitness",

  category: "Chocolate",

  imageUrl: "",

  ingredients: [
    "Sugar",
    "Gelatin",
    "Cocoa Butter",
  ],

  countries: [
    "Finland",
    "Turkey",
  ],

  certifications: [
    "Halal",
  ],

  createdAt: new Date(),

  updatedAt: new Date(),
};