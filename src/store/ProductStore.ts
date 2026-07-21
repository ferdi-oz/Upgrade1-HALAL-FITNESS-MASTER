export type Product = {
  barcode: string;
  name: string;
  brand: string;
  image: string;
  halal: "halal" | "haram" | "unknown";
  nutritionScore: number;
};

class ProductStore {
  private product: Product | null = null;

  set(product: Product) {
    this.product = product;
  }

  get(): Product | null {
    return this.product;
  }

  clear() {
    this.product = null;
  }

  hasProduct(): boolean {
    return this.product !== null;
  }
}

const productStore = new ProductStore();

export default productStore;