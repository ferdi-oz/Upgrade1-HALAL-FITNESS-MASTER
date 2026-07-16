import React, { useState } from "react";

import {
  ScrollView,
  StyleSheet,
  View,
  Pressable,
  TextInput,
} from "react-native";

import { useRouter } from "expo-router";

import Screen from "../src/components/ui/Screen";
import AppCard from "../src/components/ui/AppCard";
import AppButton from "../src/components/ui/AppButton";
import AppText from "../src/components/ui/AppText";

import { useUser } from "../src/context/UserContext";
import { UserRepository } from "../src/database/repositories/UserRepository";

export default function MembershipScreen() {

  const router = useRouter();

  const { login } = useUser();

  const repository = new UserRepository();

  const [selectedPlan, setSelectedPlan] =
    useState<"individual" | "family" | null>(null);

  const [username, setUsername] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [age, setAge] =
    useState("");

  const [gender, setGender] =
    useState("");

  const [height, setHeight] =
    useState("");

  const [weight, setWeight] =
    useState("");

  const [activityLevel, setActivityLevel] =
    useState("");

  const [goal, setGoal] =
    useState("");

  const [allergies, setAllergies] =
    useState("");

  const [diseases, setDiseases] =


    useState("");

  const [diet, setDiet] =
    useState("");

  const [familyMembers, setFamilyMembers] =
    useState<string[]>([""]);

  return (

    <Screen>

      <ScrollView
        contentContainerStyle={styles.container}
      >

        <AppText style={styles.title}>
          Unlock HALAL FITNESS
        </AppText>

        <AppText style={styles.subtitle}>
          Create your personal health profile
        </AppText>

        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#999"
          value={username}
          onChangeText={setUsername}
        />

        <View style={{ height: 12 }} />

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <View style={{ height: 20 }} />

        <AppText style={styles.sectionTitle}>
          Membership Plan
        </AppText>

        <Pressable
          onPress={() => setSelectedPlan("individual")}
        >
          <AppCard
            style={{
              borderWidth:
                selectedPlan === "individual" ? 3 : 1,
              borderColor:
                selectedPlan === "individual"
                  ? "#2E7D32"
                  : "#DDD",
            }}
          >
            <AppText style={styles.planTitle}>
              ⭐ Individual
            </AppText>

            <AppText>
              ✔ Unlimited product scans
            </AppText>

            <AppText>
              ✔ Full AI Health Analysis
            </AppText>

            <AppText>
              ✔ Favorites
            </AppText>

            <AppText>
              ✔ History
            </AppText>

          </AppCard>
        </Pressable>

        <View style={{ height: 14 }} />

        <Pressable
          onPress={() => setSelectedPlan("family")}
        >
          <AppCard
            style={{
              borderWidth:
                selectedPlan === "family" ? 3 : 1,
              borderColor:
                selectedPlan === "family"
                  ? "#2E7D32"
                  : "#DDD",
            }}
          >
            <AppText style={styles.planTitle}>
              👨‍👩‍👧 Family
            </AppText>

            <AppText>
              ✔ Everything in Individual
            </AppText>

            <AppText>
              ✔ Family Profiles
            </AppText>

            <AppText>
              ✔ Shared History
            </AppText>

            <AppText>
              ✔ Shared Favorites
            </AppText>

          </AppCard>
        </Pressable>

        <View style={{ height: 24 }} />

        <AppText style={styles.sectionTitle}>
          Health Profile
        </AppText>

        <TextInput
          style={styles.input}
          placeholder="Age"
          placeholderTextColor="#999"
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
        />

        <View style={{ height: 12 }} />

        <TextInput
          style={styles.input}
          placeholder="Gender (Male / Female)"
          placeholderTextColor="#999"
          value={gender}
          onChangeText={setGender}
        />

        <View style={{ height: 12 }} />

        <TextInput
          style={styles.input}
          placeholder="Height (cm)"
          placeholderTextColor="#999"
          keyboardType="numeric"
          value={height}
          onChangeText={setHeight}
        />

        <View style={{ height: 12 }} />

        <TextInput
          style={styles.input}
          placeholder="Weight (kg)"
          placeholderTextColor="#999"
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
        />

        <View style={{ height: 12 }} />

        <TextInput
          style={styles.input}
          placeholder="Activity Level"
          placeholderTextColor="#999"
          value={activityLevel}
          onChangeText={setActivityLevel}
        />

        <View style={{ height: 12 }} />

        <TextInput
          style={styles.input}
          placeholder="Goal (Lose Weight / Maintain / Gain Muscle)"
          placeholderTextColor="#999"
          value={goal}
          onChangeText={setGoal}
        />

        <View style={{ height: 12 }} />

        <TextInput
          style={styles.input}
          placeholder="Allergies"
          placeholderTextColor="#999"
          value={allergies}
          onChangeText={setAllergies}
        />

        <View style={{ height: 12 }} />

        <TextInput
          style={styles.input}
          placeholder="Chronic Diseases"
          placeholderTextColor="#999"
          value={diseases}
          onChangeText={setDiseases}
        />

        <View style={{ height: 12 }} />

        <TextInput
          style={styles.input}
          placeholder="Diet (Halal / Vegan / Keto ...)"
          placeholderTextColor="#999"
          value={diet}
          onChangeText={setDiet}
        />

        {selectedPlan === "family" && (
          <>
            <View style={{ height: 24 }} />

            <AppText style={styles.sectionTitle}>
              Family Members
            </AppText>

            {familyMembers.map((member, index) => (
              <View key={index} style={{ marginBottom: 10 }}>
                <TextInput
                  style={styles.input}
                  placeholder={`Family Member ${index + 1}`}
                  placeholderTextColor="#999"
                  value={member}
                  onChangeText={(text) => {
                    const updated = [...familyMembers];
                    updated[index] = text;
                    setFamilyMembers(updated);
                  }}
                />
              </View>
            ))}

            <AppButton
              title="＋ Add Family Member"
              onPress={() =>
                setFamilyMembers([
                  ...familyMembers,
                  "",
                ])
              }
            />
          </>
        )}

        <View style={{ height: 30 }} />


        <AppButton
          title="Continue"
          onPress={async () => {

            if (!selectedPlan) {
              alert("Please select a membership plan.");
              return;
            }

            if (!username.trim()) {
              alert("Please enter a username.");
              return;
            }

            const id = await repository.createUser({

              username: username.trim(),

              email: email.trim(),

              mode: selectedPlan,

              age: age ? Number(age) : undefined,

              gender,

              height: height ? Number(height) : undefined,

              weight: weight ? Number(weight) : undefined,

              activityLevel,

              goal,

              allergies,

              diseases,

              diet,

            });

            login({

              id,

              username: username.trim(),

              mode: selectedPlan,

            });

            router.replace("/(tabs)");

          }}
        />

        <View style={{ height: 12 }} />

        <AppButton
          title="Back"
          onPress={() => router.back()}
        />

      </ScrollView>

    </Screen>

  );

}

const styles = StyleSheet.create({

  container: {
    padding: 20,
    paddingBottom: 60,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8,
  },

  subtitle: {
    textAlign: "center",
    color: "#666",
    marginBottom: 24,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
  },

  planTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#FFF",
  },

});