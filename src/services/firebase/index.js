import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCoHIFmjB2wfuqeB3io7uyaW5TUapMAS3I",
    authDomain: "backend34780-54eed.firebaseapp.com",
    projectId: "backend34780-54eed",
    storageBucket: "backend34780-54eed.appspot.com",
    messagingSenderId: "778557477234",
    appId: "1:778557477234:web:2e98e7ae5b03315e914deb"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);