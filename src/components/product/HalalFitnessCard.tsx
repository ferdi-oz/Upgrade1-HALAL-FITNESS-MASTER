import React from "react";

import { useRouter } from "expo-router";
import AppButton from "../ui/AppButton";


import AppCard from "../ui/AppCard";
import AppText from "../ui/AppText";

type Props = {
  score: number;
  isGuest: boolean;
};

export default function HalalFitnessCard({
  score,
  isGuest,
}: Props) {

const router = useRouter();

  return (

    <AppCard>

      <AppText
        style={{
          fontSize: 20,
          fontWeight: "700",
          marginBottom: 12,
        }}
      >
        ⭐ Halal Fitness Score
      </AppText>

      {isGuest && (

        <AppText
          style={{
            color: "#C62828",
            textAlign: "center",
            marginBottom: 12,
            fontWeight: "600",
          }}
        >
          🔒 Health Analysis is available for members only.
        </AppText>

      )}

      <AppText
        style={{
          fontSize: 42,
          fontWeight: "700",
          textAlign: "center",
          color:
            score >= 80
              ? "#2E7D32"
              : score >= 60
              ? "#F9A825"
              : "#C62828",
        }}
      >
        {isGuest ? "🔒" : `${score}/100`}
      </AppText>


      {isGuest && (

        <AppButton
          title="Upgrade Now"
          onPress={() => router.push("/membership")}
        />

      )}

      {!isGuest && (

        <AppText
          style={{
            textAlign: "center",
            marginTop: 10,
          }}
        >
          {score >= 90
            ? "🟢 Excellent"
            : score >= 80
            ? "🟢 Good Choice"
            : score >= 60
            ? "🟡 Consume Carefully"
            : "🔴 Not Recommended"}
        </AppText>

      )}

    </AppCard>

  );

}