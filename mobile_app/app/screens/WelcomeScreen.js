import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useCallback } from "react";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";

const icon = require("../assets/favicon.png");

const WelcomeScreen = () => {
  const [fontsLoaded, fontError] = useFonts({
    TitanOne: require("../assets/fonts/TitanOne-Regular.ttf"),
  });

  useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const navigation = useNavigation();

  const LoginHandler = () => {
    navigation.navigate("SignIn");
  };

  const RegisterHandler = () => {
    navigation.navigate("Register");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to</Text>
      <View style={styles.logo}>
        <Text style={styles.logoText}>PARKING</Text>
        <Text style={styles.logoText}>FURIOUS</Text>
      </View>
      <View style={styles.buttonView}>
        <TouchableOpacity
          onPress={LoginHandler}
          style={[styles.button, { marginBottom: "17%" }]}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={RegisterHandler}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#e0f4fe",
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    flex: 1,
    resizeMode: "contain",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    position: "absolute",
    top: 190,
    backgroundColor: "white",
    width: 120,
    height: 120,
    borderRadius: 750,
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    fontWeight: "bold",
    fontSize: 18,
    fontFamily: "TitanOne",
    color: "#eb2e64",
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
    color: "black",
    top: 100,
    position: "absolute",
  },
  buttonView: {
    flexDirection: "collumn", // Arrange buttons horizontally
    justifyContent: "space-between", // Add space between buttons
    height: 80,
    marginTop: 30,
    width: "90%",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#eb2e64",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default WelcomeScreen;
