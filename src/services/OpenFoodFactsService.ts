export interface OpenFoodFactsProduct {
  barcode: string;
  name: string;
  brand: string;
  category: string;
  ingredients: string[];
  countries: string[];
}

function normalizeIngredient(value: string): string {
  return value
    .replace(/\([^)]*\)/g, " ")
    .replace(/\[[^\]]*\]/g, " ")
    .replace(/\{[^}]*\}/g, " ")
    .replace(/[0-9]+(\.[0-9]+)?%/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function parseIngredients(p: any): string[] {
  const text: string =
    p.ingredients_text ??
    p.ingredients_text_tr ??
    p.ingredients_text_en ??
    "";

  if (text.trim().length > 0) {
    const list = text
      .split(/[,;.\n]/)
      .map(normalizeIngredient)
      .filter((x) => x.length > 0);

    return [...new Set(list)];
  }

  const tags: string[] = p.ingredients_tags ?? [];

  const list = tags
    .map((tag) => tag.split(":").pop() ?? tag)
    .map(normalizeIngredient)
    .filter((x) => x.length > 0);

  return [...new Set(list)];
}

export class OpenFoodFactsService {
  async getProduct(barcode: string): Promise<OpenFoodFactsProduct | null> {
    try {
      console.log("FETCH BAŞLADI");

      const response = await fetch(
        `https://world.openfoodfacts.org/api/v2/product/${barcode}.json`
      );

      if (!response.ok) {
        console.log("OpenFoodFacts HTTP hatası:", response.status);
        return null;
      }

      const json = await response.json();

      console.log("JSON GELDİ");

      if (json.status !== 1 || !json.product) {
        console.log("OpenFoodFacts: ürün bulunamadı ->", barcode);
        return null;
      }

      const p = json.product;

      return {
        barcode,
        name: p.product_name ?? "",
        brand: p.brands ?? "",
        category: p.categories ?? "",
        ingredients: parseIngredients(p),
        countries: p.countries_tags ?? [],
      };
    } catch (error) {
      console.log("OpenFoodFacts isteği başarısız:", error);
      return null;
    }
  }
}