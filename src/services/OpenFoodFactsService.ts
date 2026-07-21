export interface OpenFoodFactsProduct {
  barcode: string;
  name: string;
  brand: string;
  image: string;
  category: string;
  ingredients: string[];
  countries: string[];
  nutritionGrade: string;
  novaGroup: number;
  ecoScore: string;
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

    return [
      ...new Set(
        text
          .split(/[,;.\n]/)
          .map(normalizeIngredient)
          .filter(x => x.length > 0)
      ),
    ];

  }

  const tags: string[] =
    p.ingredients_tags ?? [];

  return [
    ...new Set(
      tags
        .map((tag) => tag.split(":").pop() ?? tag)
        .map(normalizeIngredient)
        .filter(x => x.length > 0)
    ),
  ];

}

export class OpenFoodFactsService {

  async getProduct(
    barcode: string
  ): Promise<OpenFoodFactsProduct | null> {

    try {

      console.log("FETCH BAŞLADI");

      const response = await fetch(
        `https://world.openfoodfacts.org/api/v2/product/${barcode}.json`
      );

      if (!response.ok) {

        console.log(
          "HTTP ERROR",
          response.status
        );

        return null;

      }

      const json = await response.json();

      if (
        json.status !== 1 ||
        !json.product
      ) {

        return null;

      }

      const p = json.product;



      return {

        barcode,

        name:
          (
            p.product_name ??
            p.product_name_en ??
            p.generic_name ??
            p.generic_name_en ??
            ""
          )
            .replace(/\s+/g, " ")
            .trim(),

        brand:
          (p.brands ?? "")
            .split(",")[0]
            .trim(),

        image:
          p.image_front_large_url ??
          p.image_front_url ??
          p.image_url ??
          p.image_small_url ??
          "",

        category:
          p.categories_tags?.join(",") ??
          p.categories ??
          "",

        ingredients:
          parseIngredients(p),

        countries:
          p.countries_tags ?? [],

        nutritionGrade:
          p.nutriscore_grade ?? "",

        novaGroup:
          Number(p.nova_group ?? 0),

        ecoScore:
          p.ecoscore_grade ?? "",

      };

    } catch (error) {

      console.log(
        "OpenFoodFacts isteği başarısız:",
        error
      );

      return null;

    }

  }

}