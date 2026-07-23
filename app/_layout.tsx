import "../src/localization";

import React, {
  useEffect,
  useState,
} from "react";

import { Stack } from "expo-router";

import { GestureHandlerRootView } from "react-native-gesture-handler";

import { SafeAreaProvider } from "react-native-safe-area-context";

import { StatusBar } from "expo-status-bar";

import WelcomeScreen from "../src/screens/WelcomeScreen";

import {
  getDatabase,
} from "../src/database/database";

import {
  UserProvider,
} from "../src/context/UserContext";

import membershipStore from "../src/store/MembershipStore";
import guestStore from "../src/store/GuestStore";
import familyStore from "../src/store/FamilyStore";
import settingsStore from "../src/store/SettingsStore";


export default function RootLayout() {

  const [showWelcome, setShowWelcome] =
    useState(true);


  useEffect(() => {

    async function initializeDatabase() {

      try {

        await getDatabase();

        await membershipStore.load();

        await guestStore.load();

        await familyStore.load();

        await settingsStore.load();


        console.log("Database and stores initialized");


      } catch (error) {

        console.error(error);

      }

    }


    initializeDatabase();


  }, []);


  if (showWelcome) {

    return (

      <WelcomeScreen
        onFinish={() => setShowWelcome(false)}
      />

    );

  }


  return (

    <GestureHandlerRootView
      style={{ flex: 1 }}
    >

      <SafeAreaProvider>

        <UserProvider>

          <StatusBar style="dark" />

          <Stack

            screenOptions={{
              headerShown: false,
            }}

          >

            <Stack.Screen
              name="(tabs)"
            />


            <Stack.Screen
              name="product/[barcode]"
              options={{
                presentation: "card",
              }}
            />


            <Stack.Screen
              name="ingredient/[code]"
              options={{
                presentation: "card",
              }}
            />


            <Stack.Screen
              name="settings/index"
              options={{
                presentation: "modal",
              }}
            />


            <Stack.Screen
              name="modal"
              options={{
                presentation: "modal",
              }}
            />


          </Stack>

        </UserProvider>

      </SafeAreaProvider>

    </GestureHandlerRootView>

  );

}
