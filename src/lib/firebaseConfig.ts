import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
    apiKey: "AIzaSyBUl67zBWVLKXORNO-pWl3zXSnk5Eg2pLM",
    authDomain: "events-app-caa78.firebaseapp.com",
    projectId: "events-app-caa78",
    storageBucket: "events-app-caa78.appspot.com",
    messagingSenderId: "377521014331",
    appId: "1:377521014331:web:18a3c749052873c290fe1e"
  };
  
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)
export { auth, db, app };