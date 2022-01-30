// import firebase from 'firebase/app';
// import 'firebase/firestore'
// import 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA7jWvezkhRicDAlab3-JEQlVfvE_YWDNw',
  authDomain: 'crwn-e-commerce-b7e47.firebaseapp.com',
  projectId: 'crwn-e-commerce-b7e47',
  storageBucket: 'crwn-e-commerce-b7e47.appspot.com',
  messagingSenderId: '882813343554',
  appId: '1:882813343554:web:a9fd5364fa517abd795adb',
  measurementId: 'G-0VDJVFG9G4',
};

// Initialize Firebase
// firebase.initializeApp(config)
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // export const auth = firebase.auth
export const firestore = getFirestore(app); // export const firestore = firebase.firestore();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' }); // 항상 Google popup을 작동.
export const signInWithGoogle = () => signInWithPopup(auth, provider);

// export default firebase;
