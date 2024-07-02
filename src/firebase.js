// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "board-game-cafe-a5978.firebaseapp.com",
  projectId: "board-game-cafe-a5978",
  storageBucket: "board-game-cafe-a5978.appspot.com",
  messagingSenderId: "1091605199751",
  appId: "1:1091605199751:web:4bec3cb0d995b395387122",
  measurementId: "G-BR7CVEVMHY"
};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export {db, app, analytics, auth}