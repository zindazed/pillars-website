// Import the functions you need from the SDKs you need
// import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import "firebase/compat/firestore";
import firebase from "firebase/compat/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import "firebase/compat/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCvZWIY6RPm-QZq-Ytv97yeeS-1DN_f2yY",
  authDomain: "hijabgalleryug.firebaseapp.com",
  projectId: "hijabgalleryug",
  storageBucket: "hijabgalleryug.appspot.com",
  messagingSenderId: "592302879767",
  appId: "1:592302879767:web:c9980545d873f53a755852",
  measurementId: "G-V61R29WP90",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);
// firebase.analytics()

export const db = app.firestore();
export const storage = getStorage(app);

export const provider = new GoogleAuthProvider();
export const auth = getAuth(app);
