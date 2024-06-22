import firebase from 'firebase/app';
import 'firebase/auth';  // If you're using authentication
import 'firebase/firestore';  // If you're using Firestore
import 'firebase/storage';  // If you're using Firebase Storage

const firebaseConfig = {
    apiKey: "AIzaSyDF_gtaqHGqEieyvIzaXk1hNUF9M8jYCgQ",
    authDomain: "essence-3e531.firebaseapp.com",
    projectId: "essence-3e531",
    storageBucket: "essence-3e531.appspot.com",
    messagingSenderId: "930984705419",
    appId: "1:930984705419:web:bb3d81c094825f4c14838e",
    measurementId: "G-SQ9T8N640T"
  };

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage };