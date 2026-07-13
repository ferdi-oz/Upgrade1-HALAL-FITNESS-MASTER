export type IngredientInfo = {

  id: string;

  names: string[];

  status: "halal" | "haram" | "warning";

  vegan: boolean;

  source: string;

  description: string;

};

export const IngredientLibrary: IngredientInfo[] = [

  {

    id: "E330",

    names: [

      "e330",

      "citric acid",

      "sitrik asit"

    ],

    status: "halal",

    vegan: true,

    source: "Bitkisel",

    description:
      "Sitrik asit. Meyve ve fermantasyondan elde edilir."

  },

  {

    id: "E120",

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
      "Karmin kırmızı boya. Böcekten elde edilir."

  },

  {

    id: "Gelatin",

    names: [

      "gelatin",

      "jelatin"

    ],

    status: "warning",

    vegan: false,

    source: "Hayvansal",

    description:
      "Kaynağı bilinmiyorsa helal doğrulanmalıdır."

  },

  {

    id: "Natural flavour",

    names: [

      "natural flavour",

      "natural flavor",

      "doğal aroma"

    ],

    status: "warning",

    vegan: true,

    source: "Bilinmiyor",

    description:
      "Bitkisel veya hayvansal olabilir."

  }

];