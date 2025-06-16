// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-16dfc.firebaseapp.com",
  projectId: "mern-estate-16dfc",
  storageBucket: "mern-estate-16dfc.firebasestorage.app",
  messagingSenderId: "19417223428",
  appId: "1:19417223428:web:aa3ee505245fe3c78e8051"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);