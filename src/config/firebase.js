// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBbRptp2EUSmlU5wo6xQ9bOtGL9QI3at9Q",
  authDomain: "wishot-portfolio.firebaseapp.com",
  projectId: "wishot-portfolio",
  storageBucket: "wishot-portfolio.appspot.com",
  messagingSenderId: "152078668287",
  appId: "1:152078668287:web:bb7d3e7b899a5d245557ca",
  measurementId: "G-RBJ1Z29RF6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleAuthProvider = new GoogleAuthProvider();

export const db = getFirestore(app)
export const storage = getStorage(app);