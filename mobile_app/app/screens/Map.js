import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Callout } from "react-native-maps";
import { Marker } from "react-native-maps";
import { app } from "../services/firebaseConfig";

const Map = () => {
  const [parkingLots, setParkingLots] = useState([]);

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
      });
  }, []);

  const showLocationsofInterest = () => {
    return parkingLots.map((item, index) => {
      return (
        <Marker key={index} coordinate={item.location}>
          <Callout>
            <Text>{item.title}</Text>
          </Callout>
        </Marker>
      );
    });
  };

  return (
    <View style={styles.container}>
      {parkingLots.length > 0 ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 38.661032177462445,
            latitudeDelta: 0.011998132785542737,
            longitude: -9.20490363612771,
            longitudeDelta: 0.009577833116054535,
          }}
        >
          {showLocationsofInterest()}
        </MapView>
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#e0f4fe",
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
