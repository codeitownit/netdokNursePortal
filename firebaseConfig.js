// Import the necessary functions from Firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseConfig = {
    apiKey: "AIzaSyDZ-S1GOeJQ9uHOjFs9voGvIl0_L0XABnc",
    authDomain: "netdokproject.firebaseapp.com",
    // databaseURL: "https://netdokproject-default-rtdb.firebaseio.com",
    projectId: "netdokproject",
    storageBucket: "netdokproject.appspot.com",
    messagingSenderId: "590796765954",
    appId: "1:590796765954:web:dc2a9ca94203809618e01b",
    // measurementId: "G-K2GLZ0Z6V7"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db=getFirestore(app);
export default app;