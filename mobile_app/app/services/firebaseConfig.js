import {
  getAuth,
  initializeAuth,
} from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyAJVk3sNrYOLzv7xmA627WUv4doTx2dTmU",
  authDomain: "parkingfurious.firebaseapp.com",
  projectId: "parkingfurious",
  storageBucket: "parkingfurious.appspot.com",
  messagingSenderId: "1014075302086",
  appId: "1:1014075302086:web:5c25470062fed26ad2f7c7",
};

const app = firebase.initializeApp(firebaseConfig);
/* const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
}); */
const auth = getAuth(app);

export { app, auth };
