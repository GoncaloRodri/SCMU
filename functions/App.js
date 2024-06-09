import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
} from "firebase/firestore/lite";
import moment from "moment";
import { getDatabase, ref, onValue, update } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAJVk3sNrYOLzv7xmA627WUv4doTx2dTmU",
  authDomain: "parkingfurious.firebaseapp.com",
  projectId: "parkingfurious",
  storageBucket: "parkingfurious.appspot.com",
  messagingSenderId: "1014075302086",
  appId: "1:1014075302086:web:5c25470062fed26ad2f7c7",
  databaseURL:
    "https://parkingfurious-default-rtdb.europe-west1.firebasedatabase.app",
};

const TIMEOUT = 5; // minutes
const TIME_INTERVAL = 3; // hours

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const database = getDatabase(app);

while (true) {
  const bookedParkings = await getDocs(collection(firestore, "bookedParkings"));
  for (const doc of bookedParkings.docs) {
    const data = doc.data();
    const now = moment();
    if (moment(data.endDate, "YYYY-MM-DD HH:mm").isBefore(now)) {
      console.log(`Parking ${doc.id} has expired`);
      await deleteDoc(doc.ref);
      continue;
    }
    if (
      moment(data.startDate, "YYYY-MM-DD HH:mm").isBefore(
        now.add(TIME_INTERVAL, "hours")
      )
    ) {
      const parkingRef = ref(database, `${data.parkingLot}`);
      const updates = {};
      onValue(parkingRef, (snapshot) => {
        const parking = snapshot.val();
        for (const spot in parking) {
          if (spot === data.parkingSpot && parking[spot] === "free") {
            updates[spot] = "reserved";
          }
        }
        console.log("Updates: ", updates);
        update(parkingRef, updates)
          .then(() => {
            console.log("Fields updated successfully");
          })
          .catch((error) => {
            console.error("Error updating field: ", error);
          });
      });
    }
  }
  await new Promise((resolve) => setTimeout(resolve, 1000 * 60 * TIMEOUT));
}
