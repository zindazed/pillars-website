// Import the functions you need from the SDKs you need
// import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import "firebase/compat/firestore";
import firebase from "firebase/compat/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import "firebase/compat/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB97cgv8Xz-1TcTAPhkHZArvpz2QjgjN_8",
  authDomain: "eczotic-1fc0b.firebaseapp.com",
  projectId: "eczotic-1fc0b",
  storageBucket: "eczotic-1fc0b.appspot.com",
  messagingSenderId: "769576882388",
  appId: "1:769576882388:web:2171a51e7eaf46ef2f2b41",
  measurementId: "G-N0HC38VHRP",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);
firebase.analytics();

export const db = app.firestore();
export const storage = getStorage(app);

export const provider = new GoogleAuthProvider();
export const auth = getAuth(app);
