import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { app } from "../services/firebaseConfig";
import { useAuth } from "../contexts/authContexts";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

const Saved = () => {
  const { currentUser, userData } = useAuth();
  const navigation = useNavigation();
  const [allParkingLots, setAllParkingLots] = useState([]);
  const [savedParkingLots, setSavedParkingLots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nPLs, setNPLs] = useState();

  useEffect(() => {
    const unsubscribe = app
      .firestore()
      .collection("parkingLots")
      .onSnapshot((querySnapshot) => {
        const newParkingLots = [];
        querySnapshot.forEach((doc) => {
          const { title, link, description } = doc.data();
          newParkingLots.push({
            title,
            link,
            description,
          });
        });
        setAllParkingLots(newParkingLots);
        setLoading(false);
      });

    return () => unsubscribe();
  }, []);

  const fetchUserLoggedIn = useCallback(async () => {
    if (userData && userData.email) {
      const userDoc = await app
        .firestore()
        .collection("users")
        .doc(userData.email)
        .get();
      if (userDoc.exists) {
        setNPLs(userDoc.data().saved.length);
        return userDoc.data();
      }
    }
    return null;
  }, [userData]);

  const fetchSavedParkingLots = useCallback(
    async (userLoggedIn) => {
      if (userLoggedIn && userLoggedIn.saved) {
        const savedLots = allParkingLots.filter((lot) =>
          userLoggedIn.saved.includes(lot.title)
        );
        setSavedParkingLots(savedLots);
      }
      setLoading(false);
    },
    [allParkingLots]
  );

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const fetchData = async () => {
        setLoading(true);
        const userLoggedIn = await fetchUserLoggedIn();
        if (isActive) {
          await fetchSavedParkingLots(userLoggedIn);
        }
      };

      fetchData();

      return () => {
        isActive = false;
      };
    }, [fetchUserLoggedIn, fetchSavedParkingLots])
  );

  console.log(savedParkingLots);
  console.log(nPLs);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator color="#0000ff" size="large" />
      </View>
    );
  }

  if (userData) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Saved</Text>
        <Text style={styles.text}>
          You have saved <Text style={styles.numberLocal}>{nPLs}</Text>{" "}
          locations
        </Text>
        <FlatList
          data={savedParkingLots}
          keyExtractor={(item) => item.title}
          scrollEnabled={true}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ParkingLot", { parkingLot: item })
              }
            >
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Image style={styles.cardImage} source={{ uri: item.link }} />
            </TouchableOpacity>
          )}
        />
      </View>
    );
  } else {
    return (
      <View>
        <ActivityIndicator color="#0000ff" size="large" />
      </View>
    );
  }
};

export default Saved;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#e0f4fe",
  },
  centerContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#e0f4fe",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "black",
    marginTop: "25%",
    marginLeft: "8%",
  },
  text: {
    fontSize: 20,
    color: "black",
    marginLeft: "8%",
    marginTop: "1%",
    marginBottom: "10%",
  },
  numberLocal: {
    fontSize: 20,
    color: "#eb2f63",
  },
  cardTitle: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
    marginLeft: "8%",
    marginTop: "1%",
    marginBottom: "4%",
  },
  cardImage: {
    width: "84%",
    height: 180,
    alignSelf: "center",
  },
});
