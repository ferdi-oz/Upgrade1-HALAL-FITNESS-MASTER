export class OpenBeautyFactsService {

  async getProduct(barcode: string): Promise<any | null> {

    try {

      const response = await fetch(
        `https://world.openbeautyfacts.org/api/v2/product/${barcode}.json`
      );

      if (!response.ok) {
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
          p.product_name ??
          "",

        brand:
          (p.brands ?? "")
            .split(",")[0]
            .trim(),

        image:
          p.image_front_url ??
          p.image_url ??
          "",

        category:
          p.categories ??
          "",

        ingredients: [],

        countries:
          p.countries_tags ?? [],

        nutritionGrade: "",

        novaGroup: 0,

        ecoScore: "",

      };

    } catch {

      return null;

    }

  }

}


