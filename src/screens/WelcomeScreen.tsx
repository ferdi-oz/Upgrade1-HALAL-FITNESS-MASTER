import React, { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  Image,
  StyleSheet,
  View,
} from "react-native";

type Props = {
  onFinish: () => void;
};

export default function WelcomeScreen({ onFinish }: Props) {

  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.6)).current;

  const titleOpacity = useRef(new Animated.Value(0)).current;

  const line1 = useRef(new Animated.Value(0)).current;
  const line2 = useRef(new Animated.Value(0)).current;
  const line3 = useRef(new Animated.Value(0)).current;
  const line4 = useRef(new Animated.Value(0)).current;

  useEffect(() => {

    Animated.sequence([

      Animated.parallel([

        Animated.timing(logoOpacity,{
          toValue:1,
          duration:800,
          useNativeDriver:true,
        }),

        Animated.spring(logoScale,{
          toValue:1,
          friction:5,
          useNativeDriver:true,
        })

      ]),

      Animated.timing(titleOpacity,{
        toValue:1,
        duration:500,
        useNativeDriver:true,
      }),

      Animated.timing(line1,{
        toValue:1,
        duration:250,
        useNativeDriver:true,
      }),

      Animated.timing(line2,{
        toValue:1,
        duration:250,
        useNativeDriver:true,
      }),

      Animated.timing(line3,{
        toValue:1,
        duration:250,
        useNativeDriver:true,
      }),

      Animated.timing(line4,{
        toValue:1,
        duration:250,
        useNativeDriver:true,
      }),

    ]).start();

  const timer = setTimeout(() => {
  onFinish();
},4500);

    return ()=>clearTimeout(timer);

  },[]);

  return(

    <View style={styles.container}>

      <Animated.View
        style={{
          opacity:logoOpacity,
          transform:[
            {
              scale:logoScale
            }
          ]
        }}
      >

        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

      </Animated.View>

      <Animated.Text
        style={[
          styles.title,
          {
            opacity:titleOpacity
          }
        ]}
      >
        HALALHEALTH
      </Animated.Text>

      <View style={{height:35}}/>

      <Animated.Text
        style={[
          styles.centerLine,
          {opacity:line1}
        ]}
      >
        Know
      </Animated.Text>

      <Animated.Text
        style={[
          styles.line,
          {opacity:line2}
        ]}
      >
        What You Eat,
      </Animated.Text>
      <Animated.Text
        style={[
          styles.line,
          { opacity: line3 }
        ]}
      >
        Eat What You
      </Animated.Text>

      <Animated.Text
        style={[
          styles.centerLine,
          { opacity: line4 }
        ]}
      >
        Know
      </Animated.Text>

    </View>

  );

}

const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:"#050505",
    justifyContent:"center",
    alignItems:"center",
    paddingHorizontal:30,
  },

  logo:{
    width:290,
    height:290,
    marginBottom:8,
  },

  title:{
    color:"#D4AF37",
    fontSize:28,
    fontWeight:"900",
    letterSpacing:2,
    marginBottom:10,
  },

  centerLine:{
    color:"#FFFFFF",
    fontSize:34,
    fontWeight:"600",
    textAlign:"center",
    marginVertical:4,
  },

  line:{
    color:"#FFFFFF",
    fontSize:28,
    fontWeight:"400",
    textAlign:"center",
    marginVertical:2,
  },

});