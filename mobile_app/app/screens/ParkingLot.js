import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { app } from "../services/firebaseConfig";
import { useAuth } from "../contexts/authContexts";

const ParkingLot = ({ route }) => {
  const { description, title, location, link } = route.params.parkingLot;
  const { userData } = useAuth();
  const [isSaved, setIsSaved] = useState();

  console.log(isSaved);

  useEffect(() => {
    if (userData && Array.isArray(userData.saved)) {
      setIsSaved(userData.saved.includes(title));
    }
  }, [userData, title]);

  const navigation = useNavigation();

  const saveSpot = async () => {
    if (userData && Array.isArray(userData.saved)) {
      let updatedSaved = [...userData.saved];
      if (!updatedSaved.includes(title)) {
        updatedSaved.push(title);
        try {
          await app.firestore().collection("users").doc(userData.email).update({
            saved: updatedSaved,
          });
          setIsSaved(true);
        } catch (error) {
          console.error("Error saving parking lot: ", error);
          Alert.alert("Error", "There was an error saving the parking lot.");
        }
      } else {
        updatedSaved = updatedSaved.filter((item) => item !== title);
        try {
          await app.firestore().collection("users").doc(userData.email).update({
            saved: updatedSaved,
          });
          setIsSaved(false);
        } catch (error) {
          console.error("Error removing parking lot: ", error);
          Alert.alert("Error", "There was an error removing the parking lot.");
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Image source={{ uri: link }} style={styles.image} />
      <Text style={styles.description}>{description}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("BookParking", {
            title,
          });
        }}
      >
        <Text style={styles.buttonText}>Book Parking Spot</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.altButton} onPress={saveSpot}>
        {isSaved ? (
          <Text style={styles.altButtonText}>
            Remove Parking Lot from Saved
          </Text>
        ) : (
          <Text style={styles.altButtonText}>Save Parking Lot</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("Map", {
            parkingLot: { description, title, location, link },
          });
        }}
      >
        <Text style={styles.buttonText}>See Location in Map</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ParkingLot;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#e0f4fe",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
    textAlign: "left",
    marginTop: 75,
    marginLeft: 30,
  },
  image: {
    width: "90%",
    height: 300,
    marginTop: 50,
    alignSelf: "center",
    borderRadius: 5,
  },
  description: {
    width: "90%",
    alignSelf: "center",
    marginTop: 30,
    marginBottom: 20,
    fontSize: 18,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  button: {
    backgroundColor: "white",
    width: 340,
    height: 55,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "grey",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 30,
  },
  buttonText: {
    fontSize: 17,
    color: "black",
  },
  altButton: {
    backgroundColor: "#eb2f63",
    width: 340,
    height: 55,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "grey",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 30,
  },
  altButtonText: { fontSize: 17, color: "white" },
});
