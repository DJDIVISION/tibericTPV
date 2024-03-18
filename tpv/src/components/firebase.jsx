// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/compat/app';
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC842_3Gfpfht4J3MkGFJXrYJvpBV7GGAc",
  authDomain: "tiberic-530d0.firebaseapp.com",
  databaseURL: "https://tiberic-530d0-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "tiberic-530d0",
  storageBucket: "tiberic-530d0.appspot.com",
  messagingSenderId: "155333424161",
  appId: "1:155333424161:web:370c72d54082aedd479f60",
  measurementId: "G-X0HXRJX8HE"
};

// Initialize Firebase
const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();


const firebaseApp = initializeApp(firebaseConfig);
const db = firebase.firestore();
const v9db = getFirestore(app);
const imageDB = getStorage(app);
export { db, firebaseApp, v9db, imageDB };
const analytics = getAnalytics(app);