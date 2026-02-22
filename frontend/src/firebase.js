import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase Configuration Requirements
// Fill this snippet with your Firebase console data to connect directly to GCP
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Authentication and Firestore
// This serves as the scalable model connecting to the mock Backend when ready for production.
export const auth = getAuth(app);
export const db = getFirestore(app);

// Example pattern matching application:
// const scheduleCollection = collection(db, 'schedules');
