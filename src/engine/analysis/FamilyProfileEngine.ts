export type FamilyProfile =
  | "child"
  | "pregnancy"
  | "athlete"
  | "diabetes"
  | "senior";

export class FamilyProfileEngine {

  analyze(
    profile: FamilyProfile,
    healthScore: number,
    allergyRisk: string
  ): string {

    switch (profile) {

      case "child":

        if (healthScore >= 80)
          return "Suitable for children.";

        return "Not recommended for children.";

      case "pregnancy":

        if (
          allergyRisk.toLowerCase() === "high"
        )
          return "Consult a healthcare professional before use.";

        return "Generally suitable during pregnancy.";

      case "athlete":

        if (healthScore >= 70)
          return "Suitable for athletes.";

        return "Limited nutritional benefit for athletes.";

      case "diabetes":

        if (healthScore >= 85)
          return "May be suitable for diabetic users.";

        return "Use carefully if you have diabetes.";

      case "senior":

        if (healthScore >= 75)
          return "Suitable for older adults.";

        return "Review nutritional values before use.";

      default:

        return "";

    }

  }

}