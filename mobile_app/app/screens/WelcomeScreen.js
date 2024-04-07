import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Image,
  Button,
} from "react-native";
import React, { Component } from "react";

const background = require("../assets/park-background.jpeg");
const icon = require("../assets/favicon.png");

const WelcomeScreen = ({ navigation }) => {
  const LoginHandler = async () => {
    // Get the Google Sign-In provider object
    const googleProvider = new auth.GoogleAuthProvider();

    try {
      // Trigger Google sign-in flow
      const result = await auth().signInWithPopup(googleProvider);

      // Handle successful sign-in
      const { user } = result;
      console.log("User signed in:", user);
      // Navigate to a different screen after successful login (optional)
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      // Handle errors appropriately (e.g., display an error message)
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={background} style={styles.background}>
        <Image source={icon} style={styles.logo} />
        <Text style={styles.text}>Welcome to the Park</Text>
        <View style={styles.bottonView}>
          <Button
            title="Sign In"
            onPress={LoginHandler}
            styles={styles.botton}
          />
          <Button
            title="Register"
            onPress={() => alert("Register")}
            styles={styles.botton}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  background: {
    flex: 1,
    resizeMode: "contain",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 128,
    height: 128,
    position: "absolute",
    top: 200,
  },
  text: {
    fontSize: 32,
    color: "white",
  },
  bottonView: {
    flexDirection: "collumn", // Arrange buttons horizontally
    justifyContent: "space-between", // Add space between buttons
    marginTop: 20, // Add space above buttons (optional)
    marginBottom: -300, // Add space below buttons (optional)
    height: 80,
    width: 200,
  },
  botton: {
    width: 200,
    height: 40,
    backgroundColor: "blue",
    color: "white",
    fontSize: 16,
  },
});

export default WelcomeScreen;
