import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { doSignInWithEmailAndPassword } from "../services/auth";
import { useNavigation } from "@react-navigation/native";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const googleSignIn = () => {
    //TODO
  };

  const doSignIn = async () => {
    setLoading(true);
    try {
      const user = await doSignInWithEmailAndPassword(email, password);
      setLoading(false);
      navigation.reset({ index: 0, routes: [{ name: "TabNavigator" }] });
    } catch (error) {
      setLoading(false);
      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        alert("Invalid email or password");
      } else if (error.code === "auth/invalid-email") {
        alert("Invalid email!");
      } else if (error.code === "auth/invalid-credential") {
        alert("User must register first!");
      } else if (error.code === "auth/too-many-requests") {
        alert("Too many unsuccessful attempts. Try again later");
      } else {
        alert("Sign in error: " + error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <View style={styles.inputView}>
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: 220,
        }}
      >
        <TouchableOpacity style={styles.signInButton} onPress={doSignIn}>
          <Text style={styles.signInButtonText}>Sign In</Text>
        </TouchableOpacity>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>OR</Text>
        <TouchableOpacity style={styles.googleButton}>
          <View style={styles.googleButtonContent}>
            <Image
              source={require("../assets/google-icon.png")}
              style={styles.googleIcon}
            />
            <Text style={styles.googleButtonText}>Sign In with Google</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#e0f4fe",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "black",
    top: 100,
    position: "absolute",
  },
  inputView: {
    width: "90%",
    position: "absolute",
    top: 200,
  },
  input: {
    backgroundColor: "white",
    height: 50,
    borderRadius: 5,
    padding: 10,
    color: "black",
    fontSize: 18,
    marginBottom: 15,
  },
  googleButton: {
    marginTop: 30,
    backgroundColor: "white",
    width: 250,
    height: 55,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
  googleButtonContent: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  googleIcon: {
    width: 17,
    height: 17,
  },
  googleButtonText: {
    fontSize: 18,
    color: "black",
    marginLeft: 10,
  },
  signInButton: {
    backgroundColor: "white",
    width: 250,
    height: 55,
    marginTop: 180,
    marginBottom: 30,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  signInButtonText: { fontSize: 18, color: "black" },
});
