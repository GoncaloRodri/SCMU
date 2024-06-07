import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, FlatList, ScrollView, Modal } from 'react-native';
import DatePicker from "react-native-modern-datepicker";
import { app } from "../services/firebaseConfig";

const BookParking = () => {
    const [selectedPark, setSelectedPark] = useState("");
    const [date, setDate] = useState("");
    const [openDate, setOpenDate] = useState(false);   
    const [parkingLots, setParkingLots] = useState([]);
    const [spot, setSpot] = useState("");

    function handleOnPress() {
        setOpenDate(!openDate);
    }

    useEffect(() => {
        const unsubscribe = app
            .firestore()
            .collection("parkingLots")
            .onSnapshot((querySnapshot) => {
                const newParkingLots = [];
                querySnapshot.forEach((doc) => {
                    const { title } = doc.data();
                    newParkingLots.push(title);
                });
                setParkingLots(newParkingLots);
            });

        return () => unsubscribe(); // Limpar subscrição ao desmontar o componente
    }, []);

    const handleBooking = () => {
        // Lógica para reservar a vaga de estacionamento, como salvar os dados no Firebase
        console.log({
            selectedPark,
            date,
            startTime,
            endTime
        });
        // Navegar de volta para a tela inicial ou uma confirmação de reserva
    };

    const renderParkItem = ({ item }) => (
        <TouchableOpacity
            style={[
                styles.parkButton,
                selectedPark === item && styles.selectedParkButton
            ]}
            onPress={() => setSelectedPark(item)}
        >
            <Text
                style={[
                    styles.parkButtonText,
                    selectedPark === item && styles.selectedParkButtonText
                ]}
            >
                {item}
            </Text>
        </TouchableOpacity>
    );

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Book Your Parking Spot</Text>

            <Text style={styles.label}>Select Park:</Text>
            <FlatList
                data={parkingLots}
                renderItem={renderParkItem}
                keyExtractor={(item) => item}
                horizontal={true}
                style={styles.flatList}
                scrollEnabled={true}
            />

            <Text style={styles.label}>Schedule your appointment</Text>
                {date ? <Text>Date Picked: {date}</Text> : <Text>No date selected</Text>}
                <View style={styles.dateButtonContainer}>
                    <TouchableOpacity style={styles.dateButton} onPress={handleOnPress}>
                        <Text style={styles.centerText}>
                            {date ? "Change Date" : "Choose Date"}
                        </Text>
                    </TouchableOpacity>
                    <Modal animationType="slide" transparent={true} visible={openDate}>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <DatePicker onSelectedChange={(date) => setDate(date)} />
                                <TouchableOpacity onPress={handleOnPress}>
                                    <Text>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>

            <Text style={styles.label}>Select your parking spot</Text>
                {spot ? <Text>Parking spot picked: {spot}</Text> : <Text>No spot selected</Text>}
                <View style={styles.dateButtonContainer}>
                    <TouchableOpacity style={styles.dateButton} onPress={() => navigation.navigate('ParkingSpots', selectedPark)}>
                        <Text style={styles.centerText}>
                            {spot ? "Change Parking Spot" : "Choose Parking Spot"}
                        </Text>
                    </TouchableOpacity>
                </View>

            

            <View style={styles.buttonSpacing}>
                <Button title="Book Now" onPress={handleBooking} />
            </View>

            <View style={styles.homeButtonContainer}>
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
        maxHeight: 100, // Limita a altura da lista de parques
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
        marginVertical: 20, // Adiciona margem vertical entre o botão de data e o botão de reserva
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
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    dateButtonContainer: {
        marginBottom: 20, // Add space between the date button and the next section
    },
    homeButtonContainer: {
        marginTop: 70
    },
});
