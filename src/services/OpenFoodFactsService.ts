export interface OpenFoodFactsProduct {

  barcode: string;

  name: string;

  brand: string;

  category: string;

  ingredients: string[];

  countries: string[];

}

export class OpenFoodFactsService {

  async getProduct(barcode: string): Promise<OpenFoodFactsProduct | null> {

    try {

      const response = await fetch(
        `https://world.openfoodfacts.org/api/v2/product/${barcode}.json`
      );

      const json = await response.json();

      if (json.status !== 1) {
        return null;
      }

      const p = json.product;

      return {

        barcode,

        name: p.product_name ?? "",

        brand: p.brands ?? "",

        category: p.categories ?? "",

        ingredients:
          p.ingredients_tags ?? [],

        countries:
          p.countries_tags ?? [],

      };

    } catch {

      return null;

    }

  }

}
