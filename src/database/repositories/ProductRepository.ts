import { getDatabase } from "../database";
import { Product } from "../../domain/models/Product";

export class ProductRepository {

  async findByBarcode(barcode: string): Promise<Product | null> {

    console.log("========== PRODUCT REPOSITORY ==========");
    console.log("Aranan barkod:", barcode);

    const db = await getDatabase();

    const row = await db.getFirstAsync<any>(
      "SELECT * FROM products WHERE barcode = ?",
      [barcode]
    );

    if (!row) {
      return null;
    }

    return {
      id: row.id,
      barcode: row.barcode,
      name: row.name,
      brand: row.brand ?? "",
      category: row.category ?? "",
      imageUrl: row.imageUrl ?? "",
      ingredients: JSON.parse(row.ingredients ?? "[]"),
      countries: JSON.parse(row.countries ?? "[]"),
      certifications: JSON.parse(row.certifications ?? "[]"),
      createdAt: new Date(row.createdAt),
      updatedAt: new Date(row.updatedAt),
    };
  }

  async search(text: string): Promise<Product[]> {

    const db = await getDatabase();

    const rows = await db.getAllAsync<any>(
      `
      SELECT *
      FROM products
      WHERE name LIKE ?
         OR brand LIKE ?
      ORDER BY name
      `,
      [
        `%${text}%`,
        `%${text}%`
      ]
    );

    return rows.map((row) => ({
      id: row.id,
      barcode: row.barcode,
      name: row.name,
      brand: row.brand ?? "",
      category: row.category ?? "",
      imageUrl: row.imageUrl ?? "",
      ingredients: JSON.parse(row.ingredients ?? "[]"),
      countries: JSON.parse(row.countries ?? "[]"),
      certifications: JSON.parse(row.certifications ?? "[]"),
      createdAt: new Date(row.createdAt),
      updatedAt: new Date(row.updatedAt),
    }));
  }

  async insertProduct(product: {
    barcode: string;
    name: string;
    brand: string;
    category: string;
    ingredients: string[];
    countries: string[];
  }) {

    const db = await getDatabase();

    await db.runAsync(
      `
      INSERT OR REPLACE INTO products
      (
        id,
        barcode,
        name,
        brand,
        category,
        imageUrl,
        ingredients,
        countries,
        certifications,
        createdAt,
        updatedAt
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        product.barcode,
        product.barcode,
        product.name,
        product.brand,
        product.category,
        "",
        JSON.stringify(product.ingredients),
        JSON.stringify(product.countries),
        JSON.stringify([]),
        new Date().toISOString(),
        new Date().toISOString()
      ]
    );
  }

  async updateProduct(product: {
    barcode: string;
    name: string;
    brand: string;
    category: string;
    ingredients: string[];
    countries: string[];
  }) {

    const db = await getDatabase();

    await db.runAsync(
      `
      UPDATE products
      SET
        name = ?,
        brand = ?,
        category = ?,
        ingredients = ?,
        countries = ?,
        updatedAt = ?
      WHERE barcode = ?
      `,
      [
        product.name,
        product.brand,
        product.category,
        JSON.stringify(product.ingredients),
        JSON.stringify(product.countries),
        new Date().toISOString(),
        product.barcode
      ]
    );
  }

}