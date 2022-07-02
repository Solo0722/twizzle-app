import { initializeApp } from "firebase/app";
import { GoogleAuthProvider,getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "twizzle-a25fe.firebaseapp.com",
  projectId: "twizzle-a25fe",
  storageBucket: "twizzle-a25fe.appspot.com",
  messagingSenderId: "628554637540",
  appId: "1:628554637540:web:962a74e3931d8980fb0cf1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();
