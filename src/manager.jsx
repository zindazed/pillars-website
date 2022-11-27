import { db } from "./firebase-config";
import firebase from "firebase/compat/app";

export default function statusUpdate(variable, value) {
  db.collection("projectStatus")
    .doc("hijabGallery")
    .set(
      {
        [variable]: firebase.firestore.FieldValue.increment(value),
      },
      { merge: true }
    )
    .then(() => {
      console.log("counted successfully");
    });
}

export function resetCount() {
  let today = new Date().toLocaleString("en-US", {
    timeZone: "Africa/Kampala",
  });
  db.collection("projectStatus")
    .doc("hijabGallery")
    .set(
      {
        countingDay: today,
        home: 0,
        shop: 0,
        cart: 0,
        about: 0,
      },
      { merge: true }
    )
    .then(() => {
      console.log("resetted");
    });
}
