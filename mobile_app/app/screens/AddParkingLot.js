import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { app } from "../services/firebaseConfig";
import { useNavigation } from "@react-navigation/native";

const BookParking = () => {

    const navigation = useNavigation();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [link, setLink] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");

    useEffect(() => {
    }, []);

    const handleFunc = async () => {
       app.firestore().collection("parkingLots").doc(title).set({
        description,
        link,
        location:{
            latitude,
            longitude,
        },
        spots:{
            spot1: "free",
            spot2: "free",
            spot3: "free",
            spot4: "free"
        },
        title
       })

       alert("Parking lot added to database!")
       return;

    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Add a Parking Lot</Text>

            <TextInput
          placeholder="Title"
          style={styles.input}
          value={title}
          onChangeText={setTitle}
        />
         <TextInput
          placeholder="Description"
          style={styles.input}
          value={description}
          onChangeText={setDescription}
        />
         <TextInput
          placeholder="Link"
          style={styles.input}
          value={link}
          onChangeText={setLink}
        />
         <TextInput
          placeholder="Latitude"
          style={styles.input}
          value={latitude}
          onChangeText={setLatitude}
        />
         <TextInput
          placeholder="Longitude"
          style={styles.input}
          value={longitude}
          onChangeText={setLongitude}
        />

            <View style={styles.buttonSpacing}>
                <Button title="Add to database" onPress={handleFunc} />
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
    input: {
        backgroundColor: "white",
        height: 50,
        borderRadius: 5,
        padding: 10,
        color: "black",
        fontSize: 18,
        marginBottom: 15,
      },
});
