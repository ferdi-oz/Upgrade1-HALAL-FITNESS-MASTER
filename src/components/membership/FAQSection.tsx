import React from "react";
import { View, StyleSheet } from "react-native";
import AppText from "../ui/AppText";

const faqItems = [
  {
    question: "What is Premium?",
    answer:
      "Premium gives you unlimited halal scans and access to all premium features.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes. You can cancel your subscription anytime from the App Store or Google Play.",
  },
  {
    question: "How does Family Sharing work?",
    answer:
      "Premium allows you to share your membership with your family members.",
  },
];

export default function FAQSection() {
  return (
    <View style={styles.card}>
      <AppText style={styles.title}>Frequently Asked Questions</AppText>

      {faqItems.map((item) => (
        <View key={item.question} style={styles.item}>
          <AppText style={styles.question}>{item.question}</AppText>
          <AppText style={styles.answer}>{item.answer}</AppText>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
  },

  item: {
    marginBottom: 16,
  },

  question: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 6,
  },

  answer: {
    fontSize: 14,
    lineHeight: 22,
  },
});