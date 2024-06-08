import { LogBox } from "react-native";
import React from "react";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import SignIn from "./app/screens/SignIn";
import Register from "./app/screens/Register";
import Home from "./app/screens/Home";
import Search from "./app/screens/Search";
import Profile from "./app/screens/Profile";
import History from "./app/screens/History";
import Notifications from "./app/screens/Notifications";
import Saved from "./app/screens/Saved";
import PersonalInformation from "./app/screens/PersonalInformation";
import BookParking from "./app/screens/BookParking";
import Map from "./app/screens/Map";
import ParkingLot from "./app/screens/ParkingLot";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { AuthProvider } from "./app/contexts/authContexts";
import ParkingSpots from "./app/screens/ParkingSpots";

LogBox.ignoreLogs(["@firebase/auth"]);

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PersonalInformation"
        component={PersonalInformation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BookParking"
        component={BookParking}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Saved"
        component={Saved}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="History"
        component={History}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Map"
        component={Map}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ParkingLot"
        component={ParkingLot}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="ParkingSpots"
        component={ParkingSpots}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      labeled={true}
      barStyle={{ backgroundColor: "white" }}
      shifting={true}
      activeColor="black"
      inactiveColor="black"
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home" size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="search" size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="person" size={25} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
