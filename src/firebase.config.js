// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDZ4vHNxS0YKy8RDyNu2eZ9RlXcRBYOdJs",
  authDomain: "bitezy-app.firebaseapp.com",
  projectId: "bitezy-app",
  storageBucket: "bitezy-app.appspot.com",
  messagingSenderId: "615752578981",
  appId: "1:615752578981:web:a10d80ae5dafc6fa815a4c"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export const auth = getAuth(app);
export default firebase;