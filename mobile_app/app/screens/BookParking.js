import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { app } from "../services/firebaseConfig";

const BookParking = ({ navigation }) => {
    const [selectedPark, setSelectedPark] = useState("");
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [parkingLots, setParkingLots] = useState([]);

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
                scrollEnabled={true} // Desativa a rolagem interna
            />

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Select Date:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="YYYY-MM-DD"
                    value={date}
                    onChangeText={(text) => setDate(text)}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Select Start Time:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="HH:MM"
                    value={startTime}
                    onChangeText={(text) => setStartTime(text)}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Select End Time:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="HH:MM"
                    value={endTime}
                    onChangeText={(text) => setEndTime(text)}
                />
            </View>

            <Button title="Book Now" onPress={handleBooking} />

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
});
