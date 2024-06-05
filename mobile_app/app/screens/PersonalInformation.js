import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { app } from "../services/firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from 'react';

const PersonalInformation = ({route}) => {
    const { username, email, address, carModel, carColor, carBrand, licensePlate } = route.params.userData;

    const navigation = useNavigation();

    const [editable, setEditable] = useState(false);
    const [userInfo, setUserInfo] = useState({
        username,
        email,
        address,
        carBrand,
        carModel,
        carColor,
        licensePlate
    });

    const handleEdit = () => {
        setEditable(!editable);
    };

    const handleChange = (key, value) => {
        setUserInfo({ ...userInfo, [key]: value });
    };

    const handleSave = () => {

        // Aqui você pode adicionar a lógica para salvar as informações atualizadas
        app.firestore().collection("users").doc(userInfo.email).update(
            {
            username: userInfo.username,
            email: userInfo.email,
            address: userInfo.address,
            carBrand: userInfo.carBrand,
            carModel: userInfo.carModel,
            carColor: userInfo.carColor,
            licensePlate: userInfo.licensePlate
            }
        )
        console.log('Informações salvas:', userInfo);
        setEditable(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Personal Information</Text>
            <View style={styles.infoContainer}>
                {Object.keys(userInfo).map((key) => (
                    <View style={styles.infoItem} key={key}>
                        <Text style={styles.label}>{key.charAt(0).toUpperCase() + key.slice(1)}:</Text>
                        {editable ? (
                            <TextInput
                                style={styles.input}
                                value={userInfo[key]}
                                onChangeText={(text) => handleChange(key, text)}
                            />
                        ) : (
                            <Text style={styles.value}>{userInfo[key]}</Text>
                        )}
                    </View>
                ))}
                <Button title={editable ? "Save" : "Edit"} onPress={editable ? handleSave : handleEdit} />
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Go to Profile" onPress={() => navigation.navigate('Profile')} />
            </View>
        </View>
    );
};

export default PersonalInformation;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#e0f4fe",
        justifyContent: "center",
        padding: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: "black",
        textAlign: "center",
        marginBottom: 20,
    },
    infoContainer: {
        backgroundColor: "#ffffff",
        borderRadius: 10,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    infoItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        paddingBottom: 8,
    },
    label: {
        fontSize: 18,
        fontWeight: "600",
        color: "#333",
    },
    value: {
        fontSize: 18,
        color: "#555",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 5,
        padding: 5,
        fontSize: 18,
        color: "#555",
        flex: 1,
        textAlign: 'right'
    },
    buttonContainer: {
        marginTop: 100, // Adicione espaçamento para mover o botão para baixo
    },
});
