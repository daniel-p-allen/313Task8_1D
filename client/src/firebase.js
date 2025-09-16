// src/firebase.js
// This file initializes Firebase using environment variables instead of hard-coding keys.

import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase config pulled from .env (must start with REACT_APP_ to work in React)
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase (reuse app if already initialized)
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

// Export Firebase services for use throughout the app
export const auth = getAuth(app);
export const db = getFirestore(app);
