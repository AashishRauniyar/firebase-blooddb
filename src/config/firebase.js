// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7MGLaWq8_cAn8sWKHgGwscBGZWKZGiF0",
  authDomain: "vite-blooddb.firebaseapp.com",
  projectId: "vite-blooddb",
  storageBucket: "vite-blooddb.appspot.com",
  messagingSenderId: "582784193979",
  appId: "1:582784193979:web:5813dc729edfdaf5eda09e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);