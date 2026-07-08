export interface Product {
  id: string;

  barcode: string;

  name: string;

  brand?: string;

  category?: string;

  imageUrl?: string;

  ingredients: string[];

  countries: string[];

  certifications: string[];

  createdAt: Date;

  updatedAt: Date;
}