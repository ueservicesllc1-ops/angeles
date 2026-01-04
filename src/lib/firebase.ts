import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
export const firebaseConfig = {
    apiKey: "AIzaSyCnY9JIhZ8P6xL7BF1C703MGauL8jPG7Fg",
    authDomain: "vocalvanish-p91mu.firebaseapp.com",
    projectId: "vocalvanish-p91mu",
    storageBucket: "vocalvanish-p91mu.firebasestorage.app",
    messagingSenderId: "712030912082",
    appId: "1:712030912082:web:ef629c0fd1b40160f3298b"
};

// Initialize Firebase
// use getApp to avoid re-initialization in dev HMR
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const functions = getFunctions(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, functions, auth, storage };
