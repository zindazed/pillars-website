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
