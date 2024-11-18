// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDv8Adtc_H8rNI6-2WSN9NchneTYCEToRI",
  authDomain: "clone-9687b.firebaseapp.com",
  projectId: "clone-9687b",
  storageBucket: "clone-9687b.appspot.com",
  messagingSenderId: "978615277842",
  appId: "1:978615277842:web:046c4cec9d663820e4bbcb",
  measurementId: "G-EK6PW9EY58"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth()
export default app;