import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import React from "react";
import { useAuth } from "../contexts/authContexts";



const Home = () => {
  const { userData } = useAuth(); 

  return (
    <View style={styles.container}>
      {userData ? (
        <Text>{userData.username}</Text>
      ) : (
        <ActivityIndicator color="#0000ff" size="large" />
      )}
    </View>
  );
};

export default Home;

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
