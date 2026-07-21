import React, { useEffect, useRef } from "react";
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
  onPress: () => void;
};

const SIZE = Math.min(Dimensions.get("window").width * 0.62, 250);

export default function ScanButton({ onPress }: Props) {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.04,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();

    return () => {
      animation.stop();
      scale.stopAnimation();
    };
  }, [scale]);

  return (
    <Animated.View
      style={[
        styles.wrapper,
        {
          transform: [{ scale }],
        },
      ]}
    >
      <Pressable
        android_ripple={{ color: "#234d12" }}
        style={({ pressed }) => [
          styles.button,
          {
            width: SIZE,
            height: SIZE,
            borderRadius: SIZE / 2,
            opacity: pressed ? 0.92 : 1,
            transform: [{ scale: pressed ? 0.98 : 1 }],
          },
        ]}
        onPress={onPress}
      >
        <MaterialCommunityIcons
          name="leaf"
          size={60}
          color="#7DFF3A"
        />

        <Text style={styles.title}>
          TAP TO SCAN
        </Text>

        <Text style={styles.subtitle}>
          Scan Product Barcode
        </Text>

      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    marginTop: 28,
  },

  button: {
    backgroundColor: "#101010",
    borderWidth: 4,
    borderColor: "#7DFF3A",
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#7DFF3A",
    shadowOpacity: 0.55,
    shadowRadius: 22,
    elevation: 16,
  },

  title: {
    marginTop: 18,
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "800",
    letterSpacing: 1,
  },

  subtitle: {
    marginTop: 10,
    color: "#A0A0A0",
    fontSize: 15,
  },
});