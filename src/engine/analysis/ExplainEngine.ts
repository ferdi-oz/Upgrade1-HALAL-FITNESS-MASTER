import { Ingredient } from "../types/Ingredient";

export class ExplainEngine {

  explain(
    ingredients: Ingredient[]
  ): string[] {

    const messages: string[] = [];

    for (const item of ingredients) {

      switch (item.halal) {

        case "no":

          messages.push(
            `❌ ${item.name}: Not halal.`
          );

          break;

        case "review":

          messages.push(
            `⚠ ${item.name}: Origin should be verified.`
          );

          break;

        case "unknown":

          messages.push(
            `❓ ${item.name}: Halal status unknown.`
          );

          break;

        default:

          messages.push(
            `✅ ${item.name}: Halal.`
          );

      }

    }

    return messages;

  }

}