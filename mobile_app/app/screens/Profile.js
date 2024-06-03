import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { useAuth } from "../contexts/authContexts";
import { useNavigation } from "@react-navigation/native";
import { doSignOut } from "../services/auth";

const Profile = () => {
  const { userData, setUserData } = useAuth();

  const navigation = useNavigation();

  const handleLogOut = () => {
    doSignOut().then(() => {
      setUserData(null);
      navigation.reset({ index: 0, routes: [{ name: "WelcomeScreen" }] });
    });
  };

  if (userData) {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.profilePicBack} disabled>
          <Image
            source={require("../assets/xandao-pic.png")}
            style={styles.profilePic}
          />
        </TouchableOpacity>
        <Text style={styles.title}>{userData.username}</Text>
        <View style={styles.locationView}>
          <Image
            source={require("../assets/location-icon.png")}
            style={styles.locationIcon}
          />
          <Text style={styles.locationText}>FCT</Text>
        </View>
        <View style={styles.buttonView}>
          <View style={{ borderWidth: 0.6, width: "115%" }} />
          <TouchableOpacity
            onPress={() => navigation.navigate("PersonalInformation")}
          >
            <Text style={styles.settingsText}>Personal Information</Text>
          </TouchableOpacity>
          <View style={{ borderWidth: 0.6, width: "115%" }} />
          <TouchableOpacity
            onPress={() => navigation.navigate("Notifications")}
          >
            <Text style={styles.settingsText}>Notifications</Text>
          </TouchableOpacity>
          <View style={{ borderWidth: 0.6, width: "115%" }} />
          <TouchableOpacity onPress={() => navigation.navigate("Saved")}>
            <Text style={styles.settingsText}>Saved</Text>
          </TouchableOpacity>
          <View style={{ borderWidth: 0.6, width: "115%" }} />
          <TouchableOpacity onPress={() => navigation.navigate("History")}>
            <Text style={styles.settingsText}>History</Text>
          </TouchableOpacity>
          <View style={{ borderWidth: 0.6, width: "115%" }} />
          <TouchableOpacity onPress={handleLogOut}>
            <Text style={styles.settingsText}>Log Out</Text>
          </TouchableOpacity>
          <View style={{ borderWidth: 0.6, width: "115%" }} />
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }
};

export default Profile;

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
    top: "23%",
    position: "absolute",
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  profilePicBack: {
    backgroundColor: "white",
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    position: "absolute",
    top: "10%",
  },
  locationView: {
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    top: "28%",
  },
  locationIcon: {
    width: 18,
    height: 18,
  },
  locationText: {
    fontSize: 14,
    color: "grey",
    marginLeft: 5,
  },
  buttonView: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: "10%",
  },
  settingsText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "black",
    padding: 25,
  },
});
