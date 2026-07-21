import React, { useState } from "react";

import {
  View,
  StyleSheet,
} from "react-native";

import { router } from "expo-router";

import Screen from "../components/ui/Screen";

import Logo from "../components/home/Logo";
import ScanButton from "../components/home/ScanButton";
import BottomMenu from "../components/home/BottomMenu";
import RegisterButton from "../components/home/RegisterButton";
import ResultCard from "../components/home/ResultCard";

import { useUser } from "../context/UserContext";

export default function HomeScreen() {

  const { isGuest } = useUser();

  const [showResult] = useState(false);

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

            router.push("/scan");

          }}
        />

        <View style={styles.spacer} />

        <ResultCard
          visible={showResult}
          productName="No product scanned"
          brand="HALALHEALTH"
          image="https://placehold.co/150x150/png"
          halal="unknown"
          nutritionScore={0}
          onAnalyze={() => {}}
        />

        <BottomMenu

          onHome={() => {}}

          onLibrary={() => {

            router.push("/library");

          }}

          onFavorites={() => {

            router.push("/favorites");

          }}

          onSettings={() => {

            router.push("/profile");

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
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 20,
  },

  header: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 8,
  },

  spacer: {
    flex: 1,
    minHeight: 25,
  },

  resultContainer: {
    marginTop: 20,
    marginBottom: 20,
  },


  logoArea: {
    alignItems: "center",
    justifyContent: "center",
  },

  buttonArea: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
  },

  bottomArea: {
    marginTop: 20,
  },

});

