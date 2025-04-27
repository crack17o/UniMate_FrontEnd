// Configuration Firebase
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDummyKeyForNow",
  authDomain: "unimate-demo.firebaseapp.com",
  projectId: "unimate-demo",
  storageBucket: "unimate-demo.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export les services Firebase
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);