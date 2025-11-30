// lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA6rJFmqDmocaln8bfcQC_ie-yuZzui58U",
  authDomain: "musicfix-6f935.firebaseapp.com",
  projectId: "musicfix-6f935",
  storageBucket: "musicfix-6f935.firebasestorage.app",
  messagingSenderId: "391529225337",
  appId: "1:391529225337:web:52bceea09006edb06088a8",
  measurementId: "G-9L75FTKBM3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };