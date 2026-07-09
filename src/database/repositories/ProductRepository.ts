import { getDatabase } from "../database";
import { Product } from "../../domain/models/Product";

export class ProductRepository {
  async findByBarcode(barcode: string): Promise<Product | null> {

    console.log("========== PRODUCT REPOSITORY ==========");
    console.log("Aranan barkod:", barcode);

    const db = await getDatabase();

const allProducts = await db.getAllAsync<any>(
  "SELECT barcode, name FROM products"
);

console.log("Tüm ürünler:", allProducts);

    const row = await db.getFirstAsync<any>(
      "SELECT * FROM products WHERE barcode = ?",
      [barcode]
    );

    console.log("SQLite sonucu:", row);

    if (!row) {
      console.log("Ürün bulunamadı.");
      return null;
    }

    console.log("Ürün bulundu:", row.name);

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
}