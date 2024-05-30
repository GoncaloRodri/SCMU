import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { app } from "../services/firebaseConfig";
import { useNavigation } from "@react-navigation/native";

const Map = ({ route }) => {
  const [parkingLots, setParkingLots] = useState([]);
  const [selectedParkingLot, setSelectedParkingLot] = useState(null);
  const [parkingLot, setParkingLot] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    if (route.params?.parkingLot) {
      setParkingLot(route.params.parkingLot);
    }

    const unsubscribe = app
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

    return () => unsubscribe();
  }, [route.params]);

  const handleMarkerPress = (parkingLot) => {
    setSelectedParkingLot(parkingLot);
    setModalVisible(true);
  };

  const renderMarkers = () => {
    if (parkingLot) {
      return (
        <Marker
          coordinate={parkingLot.location}
          onPress={() => handleMarkerPress(parkingLot)}
        />
      );
    }

    return parkingLots.map((item, index) => (
      <Marker
        key={index}
        coordinate={item.location}
        onPress={() => handleMarkerPress(item)}
      />
    ));
  };

  return (
    <View style={styles.container}>
      {parkingLots.length > 0 ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: parkingLot
              ? parkingLot.location.latitude
              : 38.661032177462445,
            longitude: parkingLot
              ? parkingLot.location.longitude
              : -9.20490363612771,
            latitudeDelta: 0.011998132785542737,
            longitudeDelta: 0.009577833116054535,
          }}
        >
          {renderMarkers()}
        </MapView>
      ) : (
        <ActivityIndicator />
      )}
      {selectedParkingLot && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{selectedParkingLot.title}</Text>
            <Button
              title="Check Parking Lot Info"
              onPress={() => {
                setModalVisible(false);
                navigation.navigate("ParkingLot", {
                  parkingLot: selectedParkingLot,
                });
              }}
              color="#eb2f63"
            />
            <Text></Text>
            <Button
              title="Close"
              onPress={() => setModalVisible(false)}
              color="#eb2f63"
            />
          </View>
        </Modal>
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
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
