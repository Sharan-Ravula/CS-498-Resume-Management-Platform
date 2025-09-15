// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCNp9k7l2qxw3C2O2Ux4vFfyR_6SJEOdYI",
  authDomain: "autoume-41f5f.firebaseapp.com",
  projectId: "autoume-41f5f",
  storageBucket: "autoume-41f5f.firebasestorage.app",
  messagingSenderId: "374040741379",
  appId: "1:374040741379:web:2f5b2833e38cacdea83036",
  measurementId: "G-Q18X2KGJT8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);