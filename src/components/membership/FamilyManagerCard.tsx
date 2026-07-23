import React from "react";
import { StyleSheet, View } from "react-native";

import AppButton from "../ui/AppButton";
import AppText from "../ui/AppText";

import familyStore from "../../store/FamilyStore";

export default function FamilyManagerCard() {

  const members = familyStore.getMembers();

  const addDemoMember = async () => {

    await familyStore.addMember({
      id: Date.now().toString(),
      name: "Family Member",
      email: "member@example.com",
    });

  };


  return (
    <View style={styles.card}>

      <AppText style={styles.title}>
        Family Sharing
      </AppText>

      <AppText style={styles.description}>
        Manage shared Premium access.
      </AppText>

      <AppText style={styles.count}>
        Family members: {members.length}
      </AppText>

      <AppButton
        title="Add Family Member"
        onPress={addDemoMember}
      />

    </View>
  );
}


const styles = StyleSheet.create({

  card: {
    backgroundColor:"#FFFFFF",
    borderRadius:16,
    padding:20,
    marginBottom:20,
  },

  title:{
    fontSize:20,
    fontWeight:"700",
    marginBottom:10,
  },

  description:{
    fontSize:15,
    marginBottom:15,
    lineHeight:22,
  },

  count:{
    marginBottom:20,
  },

});
