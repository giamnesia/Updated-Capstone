// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBR7cNAtXIyZBD1fK-YisJbBkS2dmtVZFQ",
  authDomain: "patient-info-67c12.firebaseapp.com",
  projectId: "patient-info-67c12",
  storageBucket: "patient-info-67c12.appspot.com",
  messagingSenderId: "144323709066",
  appId: "1:144323709066:web:368ad2a821f9d72d9d4573"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);