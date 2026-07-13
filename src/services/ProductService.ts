import {
  OpenFoodFactsService,
  OpenFoodFactsProduct,
} from "./OpenFoodFactsService";

class ProductService {

  private off = new OpenFoodFactsService();

  async findProduct(
    barcode: string
  ): Promise<OpenFoodFactsProduct | null> {

    return await this.off.getProduct(barcode);

  }

}

const productService = new ProductService();

export default productService;