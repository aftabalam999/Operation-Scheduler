import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase Configuration Requirements
// Fill this snippet with your Firebase console data to connect directly to GCP
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Authentication and Firestore
// This serves as the scalable model connecting to the mock Backend when ready for production.
export const auth = getAuth(app);
export const db = getFirestore(app);

// Example pattern matching application:
// const scheduleCollection = collection(db, 'schedules');
