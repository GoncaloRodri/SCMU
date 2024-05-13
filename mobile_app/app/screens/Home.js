import { View, Text, StyleSheet, ActivityIndicator, Image } from "react-native";
import React from "react";
import { useAuth } from "../contexts/authContexts";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";



const Home = () => {
  const { userData } = useAuth();

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {userData ? (
        <>
          <TouchableOpacity style={styles.profilePicBack} onPress={() => navigation.navigate("Profile")}>
            <Image source={require("../assets/no-profile-pic.png")} style={styles.profilePic} />
          </TouchableOpacity>
          <Text style={styles.title}>Hi {userData.username}, get ready to park and furious!</Text>
          <View style={styles.buttonView}>
            <TouchableOpacity style={styles.startButton}>
              <Text style={styles.startText}>Start Parking</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bookButton}>
              <Text style={styles.bookText}>Book Parking</Text>
            </TouchableOpacity>
          </View>
          <Image source={require("../assets/parking-sign.png")} style={styles.parkingImage}/>
        </>
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
    top: 120,
    position: "absolute",
    width: "85%"
  },
  profilePic: {
    width: 40,
    height: 40,
  },
  profilePicBack: {
    backgroundColor: "white",
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    position: "absolute",
    bottom: 255,
    left: 120
  },
  buttonView: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 300,
  },
  bookButton: {
    backgroundColor: "white",
    width: 340,
    height: 55,
    marginBottom: 30,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "grey",
    justifyContent: "center",
    alignItems: "center",
  },
  bookText: {
    fontSize: 17, color: "black",
  },
  startButton: {
    backgroundColor: "#eb2f63",
    width: 340,
    height: 55,
    marginBottom: 30,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  startText: {
    fontSize: 17, color: "white",
  },
  parkingImage: {
    position: "absolute",
    width: 150,
    height: 150,
    bottom: 50
  }
});
