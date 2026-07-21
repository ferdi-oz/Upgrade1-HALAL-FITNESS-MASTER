import { Product } from "../store/ProductStore";

export const demoProducts: Record<string, Product> = {

  "5449000000996": {
    barcode: "5449000000996",
    name: "Coca-Cola Zero",
    brand: "Coca-Cola",
    image: "https://images.openfoodfacts.org/images/products/544/900/000/0996/front_en.269.400.jpg",
    halal: "halal",
    nutritionScore: 48,
  },

  "3017620422003": {
    barcode: "3017620422003",
    name: "Nutella",
    brand: "Ferrero",
    image: "https://images.openfoodfacts.org/images/products/301/762/042/2003/front_en.437.400.jpg",
    halal: "unknown",
    nutritionScore: 30,
  },

  "7622210449283": {
    barcode: "7622210449283",
    name: "Oreo",
    brand: "Mondelez",
    image: "https://images.openfoodfacts.org/images/products/762/221/044/9283/front_en.306.400.jpg",
    halal: "unknown",
    nutritionScore: 42,
  },

};