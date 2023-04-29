// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getStorage} from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBn2nKw8hvnZMFAI41PNX98_cayhHdqo_g",
  authDomain: "ecommercesite-b3e69.firebaseapp.com",
  projectId: "ecommercesite-b3e69",
  storageBucket: "ecommercesite-b3e69.appspot.com",
  messagingSenderId: "957408793306",
  appId: "1:957408793306:web:4cb416b5e6d67e68d3cbe3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const storage = getStorage()
export { app, auth, db, storage };
