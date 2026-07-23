import React from "react";
import { StyleSheet, View } from "react-native";

import AppButton from "../ui/AppButton";
import AppText from "../ui/AppText";

import membershipStore from "../../store/MembershipStore";

export default function RestorePurchaseCard() {

  const restorePurchase = () => {
    membershipStore.activateIndividual();
  };

  return (
    <View style={styles.card}>

      <AppText style={styles.title}>
        Already purchased Premium?
      </AppText>

      <AppText style={styles.description}>
        If you have already purchased a subscription, you can restore it here.
      </AppText>

      <AppButton
        title="Restore Purchases"
        onPress={restorePurchase}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
  },

  description: {
    fontSize: 15,
    marginBottom: 20,
    lineHeight: 22,
  },

});
