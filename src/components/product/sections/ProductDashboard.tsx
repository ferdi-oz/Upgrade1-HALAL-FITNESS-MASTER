import React from "react";

import {
  DashboardScore,
  DashboardQuickStatus,
  DashboardStatistics,
  DashboardSummary,
  DashboardFamily,
} from "../../dashboard";

type Props = {
  analysis: any;
};

export default function ProductDashboard({
  analysis,
}: Props) {

  if (!analysis) {
    return null;
  }

  return (
    <>

      <DashboardScore
        score={analysis.halalFitnessScore ?? 0}
      />

      <DashboardQuickStatus
        halal={(analysis.halal?.score ?? 0) >= 80}
        healthy={(analysis.health?.score ?? 0) >= 70}
        vegan={analysis.vegan?.vegan ?? false}
        allergyRisk={analysis.allergy?.risk ?? false}
      />

      <DashboardStatistics
        ingredientCount={
          analysis.ingredients?.length ?? 0
        }
        eCodeCount={
          analysis.ecodes?.length ?? 0
        }
        warningCount={
          analysis.health?.warnings?.length ?? 0
        }
        benefitCount={
          analysis.health?.benefits?.length ?? 0
        }
      />

      <DashboardSummary
        summary={
          analysis.nutritionSummary ??
          "No summary available."
        }
      />

      <DashboardFamily
        recommendation={
          analysis.familyRecommendation ??
          "No recommendation available."
        }
      />

    </>
  );

}