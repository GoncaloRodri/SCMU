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
          {userData.role === "admin" ? (
            <>
              <Text style={styles.title}>
                Hi {userData.username}, get ready to park and furious!
              </Text>
              <View style={styles.buttonView}>
                <TouchableOpacity
                  style={styles.startButton}
                  onPress={() => navigation.navigate("AddParkingLot")}
                >
                  <Text style={styles.startText}>Add Parking Lot</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={styles.profilePicBack}
                onPress={() => navigation.navigate("Profile")}
              >
                <Image
                  source={require("../assets/xandao-pic.png")}
                  style={styles.profilePic}
                />
              </TouchableOpacity>
              <Text style={styles.title}>
                Hi {userData.username}, get ready to park and furious!
              </Text>
              <View style={styles.buttonView}>
                <TouchableOpacity
                  style={styles.startButton}
                  onPress={() => navigation.navigate("BookParking")}
                >
                  <Text style={styles.startText}>Book Parking</Text>
                </TouchableOpacity>
              </View>
              <Image
                source={require("../assets/parking-sign.png")}
                style={styles.parkingImage}
              />
            </>
          )}
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
    top: "18%",
    position: "absolute",
    width: "85%",
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 100
  },
  profilePicBack: {
    backgroundColor: "white",
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    position: "absolute",
    bottom: 320,
    left: "30%",
  },
  buttonView: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: "37%",
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
    fontSize: 17,
    color: "black",
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
    fontSize: 17,
    color: "white",
  },
  parkingImage: {
    position: "absolute",
    width: 250,
    height: 250,
    bottom: "8%",
  },
});
