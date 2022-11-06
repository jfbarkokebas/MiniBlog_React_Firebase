
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDSxipSRA8Z-wuh5DhI5nEnfCr51Xwb_v8",
  authDomain: "miniblog-d8dd6.firebaseapp.com",
  projectId: "miniblog-d8dd6",
  storageBucket: "miniblog-d8dd6.appspot.com",
  messagingSenderId: "597584777196",
  appId: "1:597584777196:web:e08dd54feb4b5c32b3fac9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)
const auth = getAuth(app)

export {db, auth}