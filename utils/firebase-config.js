// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCpnNBQDWz42VKdzHlxwDzRF__d3MmTCAA',
  authDomain: 'devryx-apps.firebaseapp.com',
  projectId: 'devryx-apps',
  storageBucket: 'devryx-apps.appspot.com',
  messagingSenderId: '9070949554',
  appId: '1:9070949554:web:6554309a161819771785ab',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
