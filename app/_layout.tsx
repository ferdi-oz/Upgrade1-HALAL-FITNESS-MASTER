import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
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