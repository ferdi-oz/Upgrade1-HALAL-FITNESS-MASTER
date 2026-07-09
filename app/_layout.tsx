import "../src/localization";

import { useEffect } from "react";

import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import { getDatabase } from "../src/database/database";

export default function RootLayout() {

  useEffect(() => {

    async function initializeDatabase() {

      try {

        await getDatabase();

        console.log("Database initialized");

      } catch (error) {

        console.error(error);

      }

    }

    initializeDatabase();

  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>

        <StatusBar style="dark" />

        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="(tabs)" />

          <Stack.Screen
            name="product/[barcode]"
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

      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}