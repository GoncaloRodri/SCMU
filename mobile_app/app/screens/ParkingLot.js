import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const ParkingLot = ({ route }) => {
  const { description, title, location, link } = route.params.item;

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Image source={{ uri: link }} style={styles.image} />
      <Text style={styles.description}>{description}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          alert("GO BOOK SOME SHIT");
        }}
      >
        <Text style={styles.buttonText}>Book Parking Spot</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.altButton}
        onPress={() => {
          alert("START HEREEEEE PARKINGG");
        }}
      >
        <Text style={styles.altButtonText}>Start Parking Here</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("Map");
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
