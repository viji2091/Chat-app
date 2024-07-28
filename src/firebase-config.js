
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDFTkbP_ynAyIKOANORFv9cyA05xRbQlxA",
  authDomain: "meet-clone-chat.firebaseapp.com",
  projectId: "meet-clone-chat",
  storageBucket: "meet-clone-chat.appspot.com",
  messagingSenderId: "820851968852",
  appId: "1:820851968852:web:e6201bd25c95dc8da556c1"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app);
