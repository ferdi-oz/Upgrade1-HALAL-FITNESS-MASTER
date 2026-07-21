import {
  OpenFoodFactsService,
  OpenFoodFactsProduct,
} from "./OpenFoodFactsService";

import { OpenBeautyFactsService } from "./OpenBeautyFactsService";
import { OpenPetFoodFactsService } from "./OpenPetFoodFactsService";

class ProductService {

  private food = new OpenFoodFactsService();

  private beauty = new OpenBeautyFactsService();

  private pet = new OpenPetFoodFactsService();

  async findProduct(
    barcode: string
  ): Promise<OpenFoodFactsProduct | null> {

    let product = await this.food.getProduct(barcode);

    if (product) {
      console.log("FOUND IN FOOD");
      return product;
    }

    product = await this.beauty.getProduct(barcode);

    if (product) {
      console.log("FOUND IN BEAUTY");
      return product;
    }

    product = await this.pet.getProduct(barcode);

    if (product) {
      console.log("FOUND IN PET");
      return product;
    }

    console.log("NOT FOUND");

    return null;

  }

}

export default new ProductService();