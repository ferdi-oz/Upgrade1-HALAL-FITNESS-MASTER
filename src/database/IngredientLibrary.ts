export type IngredientStatus =
  | "halal"
  | "haram"
  | "warning";

export interface IngredientInfo {

  id: string;

  names: string[];

  title: string;

  status: IngredientStatus;

  vegan: boolean;

  source: string;

  description: string;

  usage: string;

}

export const IngredientLibrary: IngredientInfo[] = [

  {
    id: "E330",

    title: "Citric Acid",

    names: [
      "e330",
      "citric acid",
      "sitrik asit"
    ],

    status: "halal",

    vegan: true,

    source: "Bitkisel",

    description:
      "Meyve ve fermantasyondan elde edilen doğal asitlik düzenleyici.",

    usage:
      "İçecekler, soslar, atıştırmalıklar, reçeller"
  },

  {
    id: "E120",

    title: "Carmine",

    names: [
      "e120",
      "carmine",
      "cochineal",
      "karmin"
    ],

    status: "haram",

    vegan: false,

    source: "Böcek",

    description:
      "Kırmızı renklendirici. Cochineal böceğinden elde edilir.",

    usage:
      "Şekerleme, yoğurt, içecek, tatlı"
  },

  {
    id: "Natural Flavour",

    title: "Natural Flavour",

    names: [
      "natural flavour",
      "natural flavor",
      "doğal aroma"
    ],

    status: "warning",

    vegan: true,

    source: "Belirsiz",

    description:
      "Bitkisel, hayvansal veya sentetik kaynaklı olabilir.",

    usage:
      "Çok çeşitli işlenmiş gıdalar"
  },

  {
    id: "Gelatin",

    title: "Gelatin",

    names: [
      "gelatin",
      "jelatin"
    ],

    status: "warning",

    vegan: false,

    source: "Hayvansal",

    description:
      "Kaynağı bilinmiyorsa helal doğrulaması gerekir.",

    usage:
      "Şekerleme, marshmallow, kapsül, tatlı"
  }

];