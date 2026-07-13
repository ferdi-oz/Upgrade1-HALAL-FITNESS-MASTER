export interface Product {
  id: string;

  barcode: string;

  name: string;

  brand?: string;

  category?: string;

  imageUrl?: string;

  nutritionGrade?: string;

  novaGroup?: number;

  ecoScore?: string;

  ingredients: string[];

  countries: string[];

  certifications: string[];

  createdAt: Date;

  updatedAt: Date;
}