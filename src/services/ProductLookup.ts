import productStore from "../store/ProductStore";
import { demoProducts } from "../data/demoProducts";
import { Product } from "../store/ProductStore";

class ProductLookup {

  getProduct(barcode: string): Product {

    const product =
      demoProducts[barcode];

    if (product) {

      productStore.set(product);

      return product;

    }

    const unknown: Product = {

      barcode,

      name: "Unknown Product",

      brand: "Unknown",

      image: "https://placehold.co/300x300/png",

      halal: "unknown",

      nutritionScore: 0,

    };

    productStore.set(unknown);

    return unknown;

  }

}

export default new ProductLookup();