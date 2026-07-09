import * as SQLite from "expo-sqlite";
import products from "./seed/products.json";

export async function seedDatabase(
  db: SQLite.SQLiteDatabase
) {
  console.log("Seed başladı");

  for (const product of products) {
    const existing = await db.getFirstAsync<{ barcode: string }>(
      "SELECT barcode FROM products WHERE barcode = ?",
      [product.barcode]
    );

    if (existing) {
      continue;
    }

    await db.runAsync(
      `INSERT INTO products (
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
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        `product-${product.barcode}`,
        product.barcode,
        product.name,
        product.brand ?? "",
        product.category ?? "",
        "",
        JSON.stringify(product.ingredients ?? []),
        JSON.stringify(product.countries ?? []),
        JSON.stringify(product.certifications ?? []),
        new Date().toISOString(),
        new Date().toISOString()
      ]
    );

    console.log("Eklendi:", product.name);
  }

  console.log("Seed tamamlandı");
}
