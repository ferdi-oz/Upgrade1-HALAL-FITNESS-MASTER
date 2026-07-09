import * as SQLite from "expo-sqlite";

export async function seedDatabase(
  db: SQLite.SQLiteDatabase
) {
  console.log("Seed başladı");

  const existing = await db.getFirstAsync(
    "SELECT barcode FROM products WHERE barcode = ?",
    ["8690504012345"]
  );

  if (existing) {
    console.log("Ürün zaten mevcut");
    return;
  }

  await db.runAsync(
    `INSERT INTO products
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
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      "product-001",

      "8690504012345",

      "Ülker Çikolatalı Gofret",

      "Ülker",

      "Chocolate",

      "",

      JSON.stringify([
        "Sugar",
        "Wheat Flour",
        "Cocoa",
        "Palm Oil",
        "Milk Powder"
      ]),

      JSON.stringify([
        "Turkey"
      ]),

      JSON.stringify([
        "Halal"
      ]),

      new Date().toISOString(),

      new Date().toISOString()
    ]
  );

  console.log("Örnek ürün veritabanına eklendi");
}