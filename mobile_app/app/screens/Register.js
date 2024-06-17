import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { app } from "../services/firebaseConfig";
import { doCreateUserWithEmailAndPassword } from "../services/auth";
import { useNavigation } from "@react-navigation/native";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const doRegister = async () => {
    setLoading(true);
    try {
      const user = await doCreateUserWithEmailAndPassword(email, password);
      if (user) {
        const id = user.uid;
        handleAddUser();
      }
      setLoading(false);
      navigation.reset({ index: 0, routes: [{ name: "TabNavigator" }] });
    } catch (error) {
      setLoading(false);
      //TODO Handle error handling
      if (error.code === "auth/email-already-in-use") {
        alert("This email is already used");
      } else if (error.code === "auth/weak-password") {
        alert("Weak password. Please choose a stronger password");
      } else {
        alert("Register error: " + error.message);
      }
    }
  };

  const handleAddUser = () => {
    app.firestore().collection("users").doc(email).set({
      username,
      email,
      address: "",
      carBrand: "",
      carModel: "",
      carColor: "",
      licensePlate: "",
      saved: [],
      role: "client",
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <View style={styles.inputView}>
        <TextInput
          placeholder="Name"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />
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
          position: "relative",
          top: 120,
        }}
      >
        <TouchableOpacity style={styles.signInButton} onPress={doRegister}>
          <Text style={styles.signInButtonText}>Register</Text>
        </TouchableOpacity>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>OR</Text>
        <TouchableOpacity style={styles.googleButton}>
          <View style={styles.googleButtonContent}>
            <Image
              source={require("../assets/google-icon.png")}
              style={styles.googleIcon}
            />
            <Text style={styles.googleButtonText}>Register with Google</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;

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
