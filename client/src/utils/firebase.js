import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider}  from 'firebase/auth'


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "agentverse-24f9d.firebaseapp.com",
  projectId: "agentverse-24f9d",
  storageBucket: "agentverse-24f9d.firebasestorage.app",
  messagingSenderId: "34906035744",
  appId: "1:34906035744:web:c1da5a69456cf0137dce45",
  measurementId: "G-WVJMTC8YLZ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()