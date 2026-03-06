import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCGP7UyGGG7HcdZVcG6COs7ZfZFeaqrsh0",
  authDomain: "codetypingrpg.firebaseapp.com",
  projectId: "codetypingrpg",
  storageBucket: "codetypingrpg.firebasestorage.app",
  messagingSenderId: "156840725485",
  appId: "1:156840725485:web:e38fa249a7bbef01dab5e4",
  measurementId: "G-LNY6PPKEDZ"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);