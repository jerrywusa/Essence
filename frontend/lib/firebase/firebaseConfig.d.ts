// Assuming you're using Firebase v8 as indicated by your import style
import firebase from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, Storage } from 'firebase/storage';
import { initializeApp } from 'firebase/app';

import { getApps, getApp } from 'firebase/app';


// Firebase configuration with type annotations for better type checking
const firebaseConfig: firebase.app.AppOptions = {
    apiKey: "AIzaSyDF_gtaqHGqEieyvIzaXk1hNUF9M8jYCgQ",
    authDomain: "essence-3e531.firebaseapp.com",
    projectId: "essence-3e531",
    storageBucket: "essence-3e531.appspot.com",
    messagingSenderId: "930984705419",
    appId: "1:930984705419:web:bb3d81c094825f4c14838e",
    measurementId: "G-SQ9T8N640T"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();


// Initialize Firestore and Storage with explicit types
const db: Firestore = getFirestore(app);
const storage: Storage = getStorage(app);

// Export db and storage for use in other parts of your application
export { db, storage };
