import React from "react";
import { View, StyleSheet } from "react-native";
import { router } from "expo-router";

import { useState } from "react";
import ResultCard from "../components/home/ResultCard";

import Screen from "../components/ui/Screen";

import Logo from "../components/home/Logo";
import RegisterButton from "../components/home/RegisterButton";
import ScanButton from "../components/home/ScanButton";

import BottomMenu from "../components/home/BottomMenu";

import { useUser } from "../context/UserContext";

export default function HomeScreen() {

const [showResult, setShowResult] = useState(false);

const { isGuest } = useUser();

  return (

    <Screen>

      <View style={styles.container}>

        <View style={styles.header}>



         <RegisterButton
  onPress={() => {

    if (isGuest) {

      router.push("/membership");

    } else {

      router.push("/profile");

    }

  }}
/>



        </View>
        <Logo />

       <ScanButton
  onPress={() => {
    setShowResult(true);
    router.push("/scan");
  }}
/>
        <View style={styles.spacer} />

        <BottomMenu
          onHome={() => {}}
          onLibrary={() => router.push("/library")}
          onFavorites={() => router.push("/favorites")}
          onSettings={() => router.push("/settings")}
        />
<ResultCard
  visible={showResult}
  productName="No product scanned"
  brand="HALALHEALTH"
  image="https://placehold.co/150x150/png"
  halal="unknown"
  nutritionScore={0}
  onAnalyze={() => {
    console.log("AI Analysis");
  }}
/>
      </View>

    </Screen>

  );

}
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#050505",
    paddingHorizontal: 20,
    paddingTop: 18,
  },

  header: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 10,
  },

  spacer: {
    flex: 1,
  },

});