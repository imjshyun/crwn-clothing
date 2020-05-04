import firebase from 'firebase/app';

import 'firebase/firestore'; // db - 이 어플에서 db랑 auth만 사용할거라 이 2개만 가져온다.
import 'firebase/auth'; // auth

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

firebase.initializeApp(config);
/*
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`); // 일단 ref를 항상 받는다

  const snapShot = await userRef.get(); // ref의 get() 이용해 데이터(snapshot)를 가져온다

  // 만약 페지를 리프레쉬 했을때도 계속 데이터가 저장되지 않게하기 위해 스냅샷 데이터가 이미 존재하는지 체크하고, 없을시에 유저 생성.
  // 실제 스냅샷 데이터 존재하면 exists가 true
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        // CRUD operation은 ref를 사용해야한다. 스넵샷은 걍 데이터일뿐 암것두 못함.
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef; // 나중에 userRef를 사용해 다른 작업을 할 경우를 대비하기 위해.
};

// static data를 programmatically DB에 저장하기 위해서 임시로 만든 함수
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey); // 새로운 이름의 collection ref 생성
  // console.log(collectionRef);

  const batch = firestore.batch();
  objectsToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc(); // 새로운 doc reference ojb를 유니크 id와 함께 만든다.
    batch.set(newDocRef, obj);
  });

  return await batch.commit(); // batch실행, promise 리턴.

  // return collectionRef;
};

// get the whole snapshot n 고치고 추가할거 추가하여 redux에 맞는 데이터로 바꾼다.
export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });

  // array -> obj
  // {
  //    jackets: {routeName: "jackets", id: "vAlVLiChG3wL6t9Hsqbm", title: "Jackets", items: Array(5)},
  //    hats: {routeName: "hats", id: "mgj8VvUbIFOlpoNzGK4a", title: "Hats", items: Array(9)}
  //    .....
  // }
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

// saga는 기본적은 async...wait 방식이라 Promise를 보내준다.
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};*/

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userDocRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userDocRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userDocRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (err) {
      console.error('error creating user', err.message);
    }
  }

  return userDocRef;
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });

  // objs를 갖는 obj를 objs를 갖는 array로 컨버트
  // {
  //   hats: {routeName: "hats", id: "quuP71Bw7clbQXoKvJQU", title: "Hats", items: Array(9)}
  //   jackets: {routeName: "jackets", id: "xvlG2ViidykRcEayr1Ut", title: "Jackets", items: Array(5)}
  //   mens: {routeName: "mens", id: "s2p09RGrmd7ABfk0Kcw2", title: "Mens", items: Array(6)}
  //   sneakers: {routeName: "sneakers", id: "NheWPPUEC2sObJBsSa39", title: "Sneakers", items: Array(8)}
  //   womens: {routeName: "womens", id: "LnoFpP8pqod0FVmEsCKx", title: "Womens", items: Array(7)}
  // }
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection; // 결과는 위 참조
    return accumulator;
  }, {});
};

/*// 사용하던 static data를 firestore에 똑같이 만들기 위해 한번만 사용할 메소드
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch(); // firebase는 한번에 set 하나만 실행가능하다. 여러개를 위해 batchfㄹ 이용하자
  objectsToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc(); // 유니크 id를 갖는 docReference를 생성
    batch.set(newDocRef, obj); // newDocRef.set대신 batch를 사용해 중간에 문제 생겨도 한꺼번에 성공하거나 실패하게 함
  });

  return await batch.commit();
};*/

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// Google Authentication
export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account', // 이 메소드를 사용하여 로긴시 항상 팝업창 뜨게함.
});

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider); // provider에 구글만 설정해서 이 앱은 구글만 지원.

export default firebase; // 다른데서 모든 라이브러리를 원할 경우를 대비해서.
