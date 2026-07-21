import ProductService from "../../services/ProductService";

export class ProductLookupEngine {

  static async lookup(barcode: string) {

    console.log("==================================");
    console.log("PRODUCT LOOKUP ENGINE");
    console.log("Barcode :", barcode);

    const product =
      await ProductService.findProduct(barcode);

    if (product) {

      console.log("FOUND");

      return {

        found: true,

        source: "online",

        product,

      };

    }

    console.log("NOT FOUND");

    return {

      found: false,

      product: null,

      source: "none",

    };

  }

}