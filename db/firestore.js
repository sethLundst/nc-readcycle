import { initializeApp } from "firebase/app";
import { getDoc, getFirestore } from "firebase/firestore";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  setDoc,
  doc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAmmM3CBTdIeuOY7KEXouW-SFAHeyA_Ums",
  authDomain: "readcycle-642e1.firebaseapp.com",
  databaseURL: "https://readcycle-642e1-default-rtdb.firebaseio.com",
  projectId: "readcycle-642e1",
  storageBucket: "readcycle-642e1.appspot.com",
  messagingSenderId: "465923556747",
  appId: "1:465923556747:web:0238a1c3993ad960935b8e",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export function getUserByUsername(username) {
  const q = query(collection(db, "users"), where("username", "==", username));
  return getDocs(q).then((qSnap) => {
    return qSnap.docs[0].data();
  });
}

export function postUser(user) {
  addDoc(collection(db, "users"), user).then((docRef) =>
    console.log(docRef.id)
  );
}
