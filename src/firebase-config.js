import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAQUyxHu5sdUhNJl3kflXz3nmXD1Hmy2a0",
    authDomain: "fir-tutorial-2439a.firebaseapp.com",
    projectId: "fir-tutorial-2439a",
    storageBucket: "fir-tutorial-2439a.appspot.com",
    messagingSenderId: "461937929838",
    appId: "1:461937929838:web:03a8758dd1a526d927c07f",
    measurementId: "G-B4957WBD73"
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app);