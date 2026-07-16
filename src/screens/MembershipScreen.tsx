import React from "react";
import { View, StyleSheet, Pressable } from "react-native";

import AppText from "../components/ui/AppText";

export default function MembershipScreen() {

  return (

    <View style={styles.container}>

      <AppText style={styles.title}>
        Üyelik Türünü Seç
      </AppText>

      <Pressable style={styles.card}>
        <AppText style={styles.cardTitle}>
          👤 Bireysel Üyelik
        </AppText>

        <AppText>
          Tek kullanıcı için sağlık analizleri.
        </AppText>
      </Pressable>

      <Pressable style={styles.card}>
        <AppText style={styles.cardTitle}>
          👨‍👩‍👧‍👦 Aile Üyeliği
        </AppText>

        <AppText>
          Sınırsız aile üyesi ekleyebilirsiniz.
        </AppText>
      </Pressable>

    </View>

  );

}

const styles = StyleSheet.create({

  container:{
    flex:1,
    padding:24,
    justifyContent:"center",
    backgroundColor:"#fff",
  },

  title:{
    fontSize:28,
    fontWeight:"700",
    textAlign:"center",
    marginBottom:30,
  },

  card:{
    padding:20,
    borderRadius:14,
    borderWidth:1,
    borderColor:"#ddd",
    marginBottom:20,
  },

  cardTitle:{
    fontSize:20,
    fontWeight:"700",
    marginBottom:8,
  },

});