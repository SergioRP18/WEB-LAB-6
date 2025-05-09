import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCrrWFbFecwwJDPeFIJTLw1IjoOddyrbbI",
    authDomain: "parcial-final-7e00e.firebaseapp.com",
    projectId: "parcial-final-7e00e",
    storageBucket: "parcial-final-7e00e.firebasestorage.app",
    messagingSenderId: "891222114264",
    appId: "1:891222114264:web:c14e256c00508e67cdfcad"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

