// import firebase from 'firebase/app';
// import 'firebase/firestore'
// import 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  setDoc,
  addDoc,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA7jWvezkhRicDAlab3-JEQlVfvE_YWDNw',
  authDomain: 'crwn-e-commerce-b7e47.firebaseapp.com',
  projectId: 'crwn-e-commerce-b7e47',
  storageBucket: 'crwn-e-commerce-b7e47.appspot.com',
  messagingSenderId: '882813343554',
  appId: '1:882813343554:web:a9fd5364fa517abd795adb',
  measurementId: 'G-0VDJVFG9G4',
};

// firestore에 query를 보내면 항상 Collection/Document의 QueryRef 혹은 QuerySnapshot을 반환 받는다
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const docRef = doc(db, 'users', userAuth.uid); // userAuth의 uid로 docRef를 얻는다
  // console.log({ docRef });
  const docSnap = await getDoc(docRef); // 위 ref를 전달하여 snapshot을 얻는다
  // console.log({ docSnap });

  /* if (docSnap.exists()) {
    console.log('Document data:', docSnap.data()); // snapshot의 exists()를 사용해 데이터 유무를 얻고 sanpshot의 data()로 실제 데이터 가져온다
  } else {
    // doc.data() will be undefined in this case
    console.log('No such document!');
  } */
  // let userRef = null;
  if (!docSnap.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      /* userRef = await addDoc(collection(db, 'users'), {
        displayName,
        email,
        createdAt,
        ...additionalData,
      }); */
      await setDoc(docRef, {
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  return docRef;
};

// Initialize Firebase
// firebase.initializeApp(config)
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // export const auth = firebase.auth
export const db = getFirestore(app); // export const firestore = firebase.firestore();

/* 
연습
const usersRef = collection(db, 'users');
const docRef = doc(db, 'users', '71WnsVXBrymIo3lGGUb1');
console.log(docRef); */

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' }); // 항상 Google popup을 작동.
export const signInWithGoogle = () => signInWithPopup(auth, provider);

// export default firebase;
