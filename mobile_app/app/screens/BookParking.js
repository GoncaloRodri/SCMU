import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, FlatList, ScrollView, Modal } from 'react-native';
import DatePicker from "react-native-modern-datepicker";
import { app } from "../services/firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../contexts/authContexts";

const BookParking = () => {
    const [selectedPark, setSelectedPark] = useState(null);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [openStartDate, setOpenStartDate] = useState(false);
    const [openEndDate, setOpenEndDate] = useState(false);
    const [parkingLots, setParkingLots] = useState([]);
    const [spot, setSpot] = useState(null);

    const { userData, setUserData } = useAuth();
    const username = userData.username;

    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = app
            .firestore()
            .collection("parkingLots")
            .onSnapshot((querySnapshot) => {
                const newParkingLots = [];
                querySnapshot.forEach((doc) => {
                    newParkingLots.push({ id: doc.id, ...doc.data() });
                });
                setParkingLots(newParkingLots);
            });

        return () => unsubscribe(); // Clean up subscription on component unmount
    }, []);

    const handleBooking = async () => {
        if (!selectedPark || !spot || !startDate || !endDate) {
            alert("Please select a park, spot, and both start and end dates");
            return;
        }

        const currentTime = new Date().getTime();
        const startDateTime = new Date(startDate).getTime();
        const endDateTime = new Date(endDate).getTime();

        if (startDateTime <= currentTime) {
            alert("Start date should be after the current time");
            return;
        }

        if (endDateTime <= startDateTime) {
            alert("End date should be after the start date");
            return;
        }

        try {
            // Fetch the selected parking lot document
            const parkingLotDoc = await app.firestore().collection('parkingLots').doc(selectedPark.id).get();
            
            if (parkingLotDoc.exists) {
                const parkingLotData = parkingLotDoc.data();
                const spots = parkingLotData.spots;

                // Check if the selected spot exists and its status
                if (spots[spot] && spots[spot] === 'free') {
                    // Update the spot status to 'reserved'
                    await app.firestore().collection('parkingLots').doc(selectedPark.id).update({
                        [`spots.${spot}`]: 'reserved'
                    });

                    // Add the booking information to the bookedParkings collection
                    await app.firestore().collection('bookedParkings').add({
                        parkingLot: selectedPark.id,
                        parkingSpot: spot,
                        username,
                        startDate,
                        endDate,
                    });

                    alert('Parking spot reserved successfully');
                    navigation.navigate('Home');
                } else {
                    alert(`Parking spot is currently ${spots[spot]}`);
                }
            } else {
                alert('Selected parking lot does not exist');
            }
        } catch (error) {
            console.error("Error updating parking spot: ", error);
        }
    };

    const renderParkItem = ({ item }) => (
        <TouchableOpacity
            style={[
                styles.parkButton,
                selectedPark?.id === item.id && styles.selectedParkButton
            ]}
            onPress={() => setSelectedPark(item)}
        >
            <Text
                style={[
                    styles.parkButtonText,
                    selectedPark?.id === item.id && styles.selectedParkButtonText
                ]}
            >
                {item.title}
            </Text>
        </TouchableOpacity>
    );

    const chooseParkingSpot = () => {
        if (selectedPark) {
            navigation.navigate('ParkingSpots', {
                selectedPark,
                onSpotSelect: (selectedSpot) => setSpot(selectedSpot)
            });
        } else {
            alert('Please select a park first');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Book Your Parking Spot</Text>

            <Text style={styles.label}>Select Park:</Text>
            <FlatList
                data={parkingLots}
                renderItem={renderParkItem}
                keyExtractor={(item) => item.id}
                horizontal={true}
                style={styles.flatList}
                scrollEnabled={true}
            />

            <Text style={styles.label}>Select Start Date:</Text>
            {startDate ? <Text>Start Date: {startDate}</Text> : <Text>No start date selected</Text>}
            <View style={styles.dateButtonContainer}>
                <TouchableOpacity style={styles.dateButton} onPress={() => setOpenStartDate(true)}>
                    <Text style={styles.centerText}>
                        {startDate ? "Change Start Date" : "Choose Start Date"}
                    </Text>
                </TouchableOpacity>
                <Modal animationType="slide" transparent={true} visible={openStartDate}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <DatePicker onSelectedChange={(date) => { setStartDate(date); setOpenStartDate(false); }} />
                            <TouchableOpacity onPress={() => setOpenStartDate(false)}>
                                <Text>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>

            <Text style={styles.label}>Select End Date:</Text>
            {endDate ? <Text>End Date: {endDate}</Text> : <Text>No end date selected</Text>}
            <View style={styles.dateButtonContainer}>
                <TouchableOpacity style={styles.dateButton} onPress={() => setOpenEndDate(true)}>
                    <Text style={styles.centerText}>
                        {endDate ? "Change End Date" : "Choose End Date"}
                    </Text>
                </TouchableOpacity>
                <Modal animationType="slide" transparent={true} visible={openEndDate}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <DatePicker onSelectedChange={(date) => { setEndDate(date); setOpenEndDate(false); }} />
                            <TouchableOpacity onPress={() => setOpenEndDate(false)}>
                                <Text>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>

            <Text style={styles.label}>Select your parking spot</Text>
            {spot ? <Text>Parking spot picked: {spot}</Text> : <Text>No spot selected</Text>}
            <View>
                <TouchableOpacity style={styles.dateButton} onPress={chooseParkingSpot}>
                    <Text style={styles.centerText}>
                        {spot ? "Change Parking Spot" : "Choose Parking Spot"}
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.buttonSpacing}>
                <Button title="Book Now" onPress={handleBooking} />
            </View>

            <View style={styles.buttonContainer}>
                <Button title="Back to Home" onPress={() => navigation.navigate('Home')} />
            </View>
        </ScrollView>
    );
};

export default BookParking;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "#e0f4fe",
        padding: 20,
        justifyContent: "center",
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: "black",
        textAlign: "center",
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        fontWeight: "600",
        color: "#333",
        marginBottom: 10,
    },
    flatList: {
        maxHeight: 100, // Limit the height of the park list
        marginBottom: 20,
    },
    parkButton: {
        backgroundColor: "#ddd",
        padding: 10,
        borderRadius: 5,
        margin: 5,
        alignItems: "center",
        flex: 1,
    },
    selectedParkButton: {
        backgroundColor: "#87CEEB",
    },
    parkButtonText: {
        color: "#333",
        fontWeight: "600",
    },
    selectedParkButtonText: {
        color: "#fff",
    },
    inputContainer: {
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 5,
        padding: 10,
        fontSize: 18,
        color: "#555",
    },
    buttonContainer: {
        marginTop: 20,
    },
    buttonSpacing: {
        marginVertical: 20, // Add vertical margin between date button and booking button
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        width: "90%",
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
    centerText: {
        textAlign: "center",
    },
    dateButton: {
        padding: 10,
        borderRadius: 10,
        borderColor: "black",
        borderWidth: 1,
        marginTop: 10,
        alignItems: "center",
    },
    dateButtonContainer: {
        marginBottom: 20, // Add space between the date button and the next section
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
});
