import { IngredientParser } from "./parser/IngredientParser";
import { IngredientNormalizer } from "./normalizer/IngredientNormalizer";
import { IngredientEngine } from "./ingredients/IngredientEngine";

const parser = new IngredientParser();
const normalizer = new IngredientNormalizer();
const engine = new IngredientEngine();

export interface AnalysisItem {

  raw: string;

  normalized: string;

  ingredient: any | null;

  ecode: any | null;

  status: "halal" | "warning" | "haram" | "unknown";

}

export function analyzeIngredients(text: string): AnalysisItem[] {

  const parsed =
    parser.parse(text);

  const normalized =
    parsed.map(item =>
      normalizer.normalize(item)
    );

  const result: AnalysisItem[] = [];

  for (const item of normalized) {

    const ingredient =
      engine.find(item);

    if (ingredient) {

      result.push({

        raw: item,

        normalized: item,

        ingredient,

        ecode: null,




      status:
  ingredient.halal === "yes"
    ? "halal"
    : ingredient.halal === "no"
    ? "haram"
    : ingredient.halal === "review"
    ? "warning"
    : "unknown",



      });

      continue;

    }

    const ecode =
      engine.findECode(item);

    if (ecode) {

      result.push({

        raw: item,

        normalized: item,

        ingredient: null,

        ecode,



        status:
  ecode.halal === "yes"
    ? "halal"
    : ecode.halal === "no"
    ? "haram"
    : ecode.halal === "review"
    ? "warning"
    : "unknown",



      });

      continue;

    }

    result.push({

      raw: item,

      normalized: item,

      ingredient: null,

      ecode: null,

      status: "unknown",

    });

  }

  return result.filter(

    (item, index, array) =>

      array.findIndex(

        x => x.normalized === item.normalized

      ) === index

  );

}