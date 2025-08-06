import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDm_UDFXgkmE1n9-QHvA9Blg1v1EOJrFN0",
  authDomain: "odsquizapp.firebaseapp.com",
  projectId: "odsquizapp",
  storageBucket: "odsquizapp.firebasestorage.app",
  messagingSenderId: "739283301393",
  appId: "1:739283301393:web:7f8279bead22f12add2db0"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);