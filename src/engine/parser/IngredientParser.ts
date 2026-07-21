export class IngredientParser {

  private readonly ignoredWords = [

    // English
    "ingredients",
    "ingredient",
    "contains",
    "may contain",
    "content",
    "contents",

    // Turkish
    "içindekiler",
    "i̇çindekiler",
    "içerik",
    "içerir",

    // Finnish
    "ainesosat",
    "sisältää",
    "saattaa sisältää",

    // German
    "zutaten",
    "enthält",
    "kann enthalten",

    // French
    "ingrédients",
    "contient",
    "peut contenir"

  ];

  parse(text: string): string[] {

    return text

      .toLowerCase()

      .replace(/\r/g, "")

      .replace(/\n/g, ",")

      .replace(/:/g, ",")

      .replace(/;/g, ",")

      .replace(/\./g, ",")

      .replace(/\(/g, ",")

      .replace(/\)/g, ",")

      .replace(/\[/g, ",")

      .replace(/\]/g, ",")

      .replace(/\{/g, ",")

      .replace(/\}/g, ",")

      .replace(/\*/g, ",")

      .split(",")

      .map(item => item.trim())

      .filter(item => item.length > 0)

      .filter(item => !this.ignoredWords.includes(item))

      .filter((item, index, array) => array.indexOf(item) === index);

  }

}