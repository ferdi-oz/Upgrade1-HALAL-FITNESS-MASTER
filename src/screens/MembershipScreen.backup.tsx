import React from "react";
import { ScrollView, StyleSheet } from "react-native";

import HeroMembershipCard from "../components/membership/HeroMembershipCard";
import GuestCard from "../components/membership/GuestCard";
import PremiumBenefitsCard from "../components/membership/PremiumBenefitsCard";

import FamilyManagerCard from "../components/membership/FamilyManagerCard";


import ComparisonTable from "../components/membership/ComparisonTable";
import FAQSection from "../components/membership/FAQSection";
import RestorePurchaseCard from "../components/membership/RestorePurchaseCard";
import PrivacyCard from "../components/membership/PrivacyCard";

export default function MembershipScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <HeroMembershipCard />

     <GuestCard onContinue={() => {}} />

      <PremiumBenefitsCard />

      <FamilyManagerCard />

      <ComparisonTable />

      <FAQSection />

      <RestorePurchaseCard />

      <PrivacyCard />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    padding: 16,
    paddingBottom: 40,
  },
});