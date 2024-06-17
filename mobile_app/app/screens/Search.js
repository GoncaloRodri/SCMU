import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { app } from "../services/firebaseConfig";

const Search = () => {
  const navigation = useNavigation();
  const [searchName, setSearchName] = useState("");
  const [parkingLots, setParkingLots] = useState([]);
  const [filteredParkingLots, setFilteredParkingLots] = useState([]);

  useEffect(() => {
    app
      .firestore()
      .collection("parkingLots")
      .onSnapshot((querySnapshot) => {
        const newParkingLots = [];
        querySnapshot.forEach((doc) => {
          const { description, location, title, link } = doc.data();
          newParkingLots.push({
            description,
            location,
            title,
            link,
            id: doc.id,
          });
        });
        setParkingLots(newParkingLots);
        setFilteredParkingLots(newParkingLots);
      });
  }, []);

  const handleSearch = (text) => {
    setSearchName(text);
    if (text) {
      const filteredData = parkingLots.filter((item) =>
        item.title.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredParkingLots(filteredData);
    }
    else {
      setFilteredParkingLots(parkingLots);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.filterView}>
        <TextInput
          placeholder="Search"
          style={styles.input}
          value={searchName}
          onChangeText={handleSearch}
        />
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 20,
          }}
          onPress={() => navigation.navigate("Map")}
        >
          <Image
            source={require("../assets/location-icon.png")}
            style={styles.locationIcon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.flatListView}>
        <FlatList
          data={filteredParkingLots}
          keyExtractor={(item) => item.id}
          scrollEnabled={true}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ParkingLot", { parkingLot: item })
              }
            >
              <View style={styles.card}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Image source={{ uri: item.link }} style={styles.cardImage} />
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#e0f4fe",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "black",
    top: "20%",
    position: "absolute",
  },
  filterView: {
    flexDirection: "row",
    justifyContent: "center",
    width: "95%",
    marginTop: 60,
  },
  input: {
    backgroundColor: "white",
    height: 50,
    borderRadius: 5,
    padding: 10,
    color: "black",
    fontSize: 18,
    marginBottom: 15,
    width: "75%",
  },
  locationIcon: {
    width: 30,
    height: 30,
    marginTop: "2.5%",
    marginLeft: "10%",
  },
  flatListView: {
    flex: 1,
    width: "90%",
    marginTop: 20,
  },
  card: {
    marginBottom: 20,
    width: "100%",
    height: 250,
    textAlign: "left",
    borderRadius: 10,
    overflow: "hidden",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    padding: 10,
  },
  cardDescription: {},
  cardImage: {
    width: "95%",
    height: 200,
    resizeMode: "cover",
    alignSelf: "center",
    borderRadius: 5,
  },
});
