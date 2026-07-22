export class RecommendationEngine {

  recommend(
    halalScore: number,
    healthScore: number
  ): string {

    if (halalScore < 40) {
      return "❌ This product is not recommended because of halal concerns.";
    }

    if (healthScore < 40) {
      return "⚠ Consume occasionally. Health score is low.";
    }

    if (halalScore >= 80 && healthScore >= 80) {
      return "✅ Excellent choice. Suitable for regular consumption.";
    }

    if (halalScore >= 80 && healthScore >= 60) {
      return "✅ Good choice. Consume in moderation.";
    }

    return "ℹ Check ingredients before consuming.";
  }

}