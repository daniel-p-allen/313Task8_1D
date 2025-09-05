// This is a code comment.
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAJfmQeorq--GQLgekkgD3hrJJkXSJH21c",
  authDomain: "sit3132025.firebaseapp.com",
  projectId: "sit3132025",
  storageBucket: "sit3132025.appspot.com",
  messagingSenderId: "877738244576",
  appId: "1:877738244576:web:10422749780d72f0da1385"
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
