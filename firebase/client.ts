// Import the functions you need from the SDKs you need
import { getApps, getApp, initializeApp} from "firebase-admin/app"
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsMg1G0_t448dQz6xbwi2ib3arQU6OBkk",
  authDomain: "prepwise-501c7.firebaseapp.com",
  projectId: "prepwise-501c7",
  storageBucket: "prepwise-501c7.firebasestorage.app",
  messagingSenderId: "879632510881",
  appId: "1:879632510881:web:9cc47005220e6143c4a5e0",
  measurementId: "G-KR78SZPJ5B"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app) 
