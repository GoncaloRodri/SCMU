import React, { createContext, useContext, useState, useEffect } from "react";
import { app } from "../services/firebaseConfig";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const getUser = async (userId) => {
  try {
    const userDoc = await app.firestore().collection("users").doc(userId).get();
    if (userDoc.exists) {
      return userDoc.data();
    } else {
      console.log("No user document found");
      return null;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true);

  const setUser = async (user) => {
    setCurrentUser(user);
    if (user) {
      try {
        const userData = await getUser(user.email);
        setUserData(userData);
      } catch (error) {
        console.error(error);
      }
    } else {
      setUserData(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = app.auth().onAuthStateChanged(setUser);
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    setCurrentUser,
    userData,
    setUserData
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
