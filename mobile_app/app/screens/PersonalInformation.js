import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { app } from "../services/firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from 'react';

const PersonalInformation = ({route}) => {
    const {email} = route.params.userData;

    const fetchUserData = async () => {
        try {
            const userDoc = await app.firestore().collection('users').doc(email).get();
            const userData = userDoc.data();
            const userInfoRet = {
                username: userData.username,
                email: email,
                address: userData.address,
                carBrand: userData.carBrand,
                carModel: userData.carModel,
                carColor: userData.carColor,
                licensePlate: userData.licensePlate
            }

            if (userDoc.exists) {
                setUserInfo(userInfoRet);
                return userInfoRet;
            } else {
                console.log('No such document!');
            }
        } catch (error) {
            console.error('Error fetching user data: ', error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const navigation = useNavigation();

    const [editable, setEditable] = useState(false);
    const [userInfo, setUserInfo] = useState([]);

    const handleEdit = () => {
        setEditable(!editable);
    };

    const handleChange = (key, value) => {
        setUserInfo({ ...userInfo, [key]: value });
    };

    const handleSave = () => {
        app.firestore().collection("users").doc(userInfo.email).update(
            {
            username: userInfo.username,
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
                        {key === 'email'|| !editable ? (
                            <Text style={styles.value}>{userInfo[key]}</Text>
                        ) : (
                            <TextInput
                                style={styles.input}
                                value={userInfo[key]}
                                onChangeText={(text) => handleChange(key, text)}
                            />
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
