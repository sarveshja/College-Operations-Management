// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCEzG6kVcQqREM_tB_kAZ-p3zLKcT8MaQs",
    authDomain: "college-operations-management.firebaseapp.com",
    projectId: "college-operations-management",
    storageBucket: "college-operations-management.appspot.com",
    messagingSenderId: "904269153823",
    appId: "1:904269153823:web:1863ae8ead8d49d058f72a"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export default db;
