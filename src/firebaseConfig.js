import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDnCeZlDnRo5J3IU03AFEkD7LM1ZvWFp-w",
  authDomain: "ejemplo-front-5.firebaseapp.com",
  projectId: "ejemplo-front-5",
  storageBucket: "ejemplo-front-5.appspot.com",
  messagingSenderId: "191970294503",
  appId: "1:191970294503:web:6dd6f70efefa3668c04042"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);