export type IngredientStatus = "HALAL" | "HARAM" | "SUSPICIOUS";

export interface HalalIngredient {
  code: string;
  name: string;
  status: IngredientStatus;
  description: string;
  warning?: string;
  source?: string;
}

export const HALAL_INGREDIENT_DATABASE: HalalIngredient[] = [
  {
    code: "E100",
    name: "Curcumin",
    status: "HALAL",
    description: "Bitkisel kökenli doğal renklendirici."
  },
  {
    code: "E101",
    name: "Riboflavin",
    status: "HALAL",
    description: "B2 vitamini."
  },
  {
    code: "E120",
    name: "Carmine",
    status: "HARAM",
    description: "Karmin böceğinden elde edilen renklendirici.",
    source: "Maide 5:3"
  },
  {
    code: "E140",
    name: "Chlorophyll",
    status: "HALAL",
    description: "Bitkisel klorofil."
  },
  {
    code: "E160a",
    name: "Beta Carotene",
    status: "HALAL",
    description: "Doğal provitamin A."
  },
  {
    code: "E200",
    name: "Sorbic Acid",
    status: "HALAL",
    description: "Koruyucu."
  },
  {
    code: "E202",
    name: "Potassium Sorbate",
    status: "HALAL",
    description: "Koruyucu."
  },
  {
    code: "E211",
    name: "Sodium Benzoate",
    status: "HALAL",
    description: "Koruyucu."
  },
  {
    code: "E270",
    name: "Lactic Acid",
    status: "SUSPICIOUS",
    description: "Üretim kaynağına göre değişebilir.",
    warning: "Kaynağı belirtilmediği için doğrulanması gerekir."
  },
  {
    code: "E322",
    name: "Lecithin",
    status: "SUSPICIOUS",
    description: "Soya veya yumurtadan elde edilir.",
    warning: "Kaynağı belirtilmediği için doğrulanması gerekir."
  },
  {
    code: "E441",
    name: "Gelatin",
    status: "HARAM",
    description: "Domuz kaynaklı olabilir.",
    source: "Maide 5:3"
  },
  {
    code: "E471",
    name: "Mono and Diglycerides",
    status: "SUSPICIOUS",
    description: "Bitkisel veya hayvansal olabilir.",
    warning: "Kaynağı belirtilmediği için doğrulanması gerekir."
  },
  {
    code: "E472a",
    name: "Acetic Acid Esters",
    status: "SUSPICIOUS",
    description: "Kaynağı üreticiye göre değişebilir.",
    warning: "Kaynağı belirtilmediği için doğrulanması gerekir."
  },
  {
    code: "E476",
    name: "PGPR",
    status: "HALAL",
    description: "Bitkisel yağlardan elde edilir."
  },
  {
    code: "E542",
    name: "Bone Phosphate",
    status: "SUSPICIOUS",
    description: "Hayvansal kemik kaynaklı olabilir.",
    warning: "Kaynağı belirtilmediği için doğrulanması gerekir."
  },
  {
    code: "E570",
    name: "Fatty Acids",
    status: "SUSPICIOUS",
    description: "Bitkisel veya hayvansal olabilir.",
    warning: "Kaynağı belirtilmediği için doğrulanması gerekir."
  },
  {
    code: "E631",
    name: "Disodium Inosinate",
    status: "SUSPICIOUS",
    description: "Hayvansal veya fermantasyon kaynaklı olabilir.",
    warning: "Kaynağı belirtilmediği için doğrulanması gerekir."
  },
  {
    code: "E635",
    name: "Disodium Ribonucleotides",
    status: "SUSPICIOUS",
    description: "Üretim kaynağı doğrulanmalıdır.",
    warning: "Kaynağı belirtilmediği için doğrulanması gerekir."
  },
  {
    code: "ALCOHOL",
    name: "Alcohol",
    status: "HARAM",
    description: "İçilebilir etil alkol.",
    source: "Maide 5:90"
  },
  {
    code: "PORK",
    name: "Pork",
    status: "HARAM",
    description: "Domuz ve domuz ürünleri.",
    source: "Maide 5:3"
  }
];