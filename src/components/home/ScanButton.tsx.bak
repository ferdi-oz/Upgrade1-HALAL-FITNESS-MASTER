import React, { useEffect, useRef } from "react";
import {
  Animated,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";

type Props = {
  onPress: () => void;
};

export default function ScanButton({ onPress }: Props) {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.06,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.wrapper,
        {
          transform: [{ scale }],
        },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.button}
        onPress={onPress}
      >
        <Text style={styles.icon}>📷</Text>

        <Text style={styles.title}>
          SCAN PRODUCT
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    marginTop: 30,
  },

  button: {
    width: 250,
    height: 250,
    borderRadius: 125,

    backgroundColor: "#101010",

    borderWidth: 4,
    borderColor: "#7DFF3A",

    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#7DFF3A",
    shadowOpacity: 0.9,
    shadowRadius: 30,
    shadowOffset: {
      width: 0,
      height: 0,
    },

    elevation: 18,
  },

  icon: {
    fontSize: 48,
    marginBottom: 12,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
    letterSpacing: 1,
  },
});