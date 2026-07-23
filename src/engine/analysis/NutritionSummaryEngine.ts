export class NutritionSummaryEngine {

  summarize(
    halalScore: number,
    healthScore: number,
    vegan: boolean,
    allergyRisk: string,
    ecodeCount: number
  ): string {

    const lines: string[] = [];

    if (halalScore >= 80) {

      lines.push(
        "This product appears to be halal."
      );

    } else {

      lines.push(
        "Halal suitability should be reviewed carefully."
      );

    }

    if (healthScore >= 80) {

      lines.push(
        "Health profile is very good."
      );

    } else if (healthScore >= 60) {

      lines.push(
        "Health profile is acceptable."
      );

    } else {

      lines.push(
        "Health profile is poor."
      );

    }

    if (vegan) {

      lines.push(
        "Suitable for vegans."
      );

    } else {

      lines.push(
        "Not suitable for vegans."
      );

    }

    if (
      allergyRisk.toLowerCase() ===
      "high"
    ) {

      lines.push(
        "High allergy risk detected."
      );

    } else if (
      allergyRisk.toLowerCase() ===
      "medium"
    ) {

      lines.push(
        "Contains possible allergens."
      );

    } else {

      lines.push(
        "No major allergy concerns."
      );

    }

    if (ecodeCount > 5) {

      lines.push(
        "Contains many food additives."
      );

    } else if (ecodeCount > 0) {

      lines.push(
        "Contains a small number of food additives."
      );

    } else {

      lines.push(
        "No food additives detected."
      );

    }

    return lines.join(" ");

  }

}