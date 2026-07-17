import React from "react";
import { View, StyleSheet } from "react-native";

import AppCard from "../ui/AppCard";
import AppText from "../ui/AppText";

import { UserProfile } from "../../context/UserContext";

interface Props {
  user: UserProfile | null;
}

export default function ProfileHeader({ user }: Props) {
  return (
    <AppCard style={styles.card}>

      <View style={styles.avatar}>
        <AppText style={styles.avatarText}>
          👤
        </AppText>
      </View>

      <AppText style={styles.name}>
        {user?.username ?? "Guest"}
      </AppText>

      <AppText style={styles.email}>
        {user?.email || "No email"}
      </AppText>

      <View style={styles.badge}>

        <AppText style={styles.badgeText}>
          {user?.mode === "family"
            ? "👨‍👩‍👧 Family"
            : "👤 Individual"}
        </AppText>

      </View>

    </AppCard>
  );
}

const styles = StyleSheet.create({

  card: {
    alignItems: "center",
    paddingVertical: 24,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#2E7D32",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },

  avatarText: {
    fontSize: 42,
  },

  name: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 6,
  },

  email: {
    color: "#777",
    marginBottom: 16,
  },

  badge: {
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 30,
  },

  badgeText: {
    color: "#2E7D32",
    fontWeight: "700",
  },

});