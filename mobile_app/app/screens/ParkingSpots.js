import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { app } from "../services/firebaseConfig";
import { useNavigation } from "@react-navigation/native";

const ParkingSpots = ({route}) => {
    const { selectedPark, onSpotSelect } = route.params;
    const [spots, setSpots] = useState([]);

    const navigation = useNavigation();

    useEffect(() => {
        if (selectedPark && selectedPark.id) {
            const unsubscribe = app
                .firestore()
                .collection("parkingLots")
                .doc(selectedPark.id)
                .onSnapshot((doc) => {
                    const data = doc.data();
                    if (data && data.spots) {
                        const spotsArray = Object.entries(data.spots).map(([key, value]) => ({
                            spot: key,
                            status: value
                        }));
                        setSpots(spotsArray);
                    } else {
                        console.error('No spots data available');
                    }
                });

            return () => unsubscribe(); // Cleanup subscription on unmount
        } else {
            console.error('Invalid selectedPark data');
        }
    }, [selectedPark]);

    const selectSpot = (spot) => {
        onSpotSelect(spot);
        navigation.goBack();
    };

    const renderSpotItem = ({ item }) => {
        let buttonStyle;
        switch (item.status) {
            case 'free':
                buttonStyle = styles.freeSpot;
                break;
            case 'occupied':
                buttonStyle = styles.occupiedSpot;
                break;
            case 'reserved':
                buttonStyle = styles.reservedSpot;
                break;
            default:
                buttonStyle = styles.defaultSpot;
                break;
        }

        return (
            <TouchableOpacity
                style={[styles.spotButton, buttonStyle]}
                onPress={() => selectSpot(item.spot)}
                disabled={item.status !== 'free'}
            >
                <Text style={styles.spotButtonText}>{item.spot}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select a Parking Spot</Text>
            <FlatList
                data={spots}
                renderItem={renderSpotItem}
                keyExtractor={(item) => item.spot}
                numColumns={2}
            />
        </View>
    );
};

export default ParkingSpots;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#e0f4fe",
        padding: 20,
        justifyContent: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "black",
        textAlign: "center",
        marginTop: 100,
        marginBottom: 20,
    },
    spotButton: {
        flex: 1,
        padding: 10,
        borderRadius: 5,
        margin: 5,
        alignItems: "center",
    },
    freeSpot: {
        backgroundColor: "green",
    },
    occupiedSpot: {
        backgroundColor: "red",
    },
    reservedSpot: {
        backgroundColor: "blue",
    },
    defaultSpot: {
        backgroundColor: "gray",
    },
    spotButtonText: {
        color: "#fff",
        fontWeight: "600",
    },
});
