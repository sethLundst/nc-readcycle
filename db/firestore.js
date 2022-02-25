import axios from "axios";
import { initializeApp } from "firebase/app";
import React, { useContext } from "react";
import { UserContext } from "../contexts/User";
import { getDoc, getFirestore } from "firebase/firestore";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  setDoc,
  doc,
  arrayUnion,
  updateDoc,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

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
const auth = getAuth(app);

export const checkEmailIsAvailable = async (email) => {
  const q = query(collection(db, "users"), where("email", "==", email));
  const qsnap = await getDocs(q);

  return qsnap.empty;
};

export const checkEmailIsOnSystem = async (email) => {
  const q = query(collection(db, "users"), where("email", "==", email));
  const qsnap = await getDocs(q);

  return !qsnap.empty;
};

export const checkUsername = async (username) => {
  const q = query(collection(db, "users"), where("username", "==", username));
  const qsnap = await getDocs(q);

  return qsnap.empty;
};

const api = axios.create({
  baseURL: "https://api.postcodes.io",
});

async function convertPostcode(postcode) {
  try {
    const response = await api.get(`/postcodes/${postcode}/`);
    const result = {
      longitude: response.data.result.longitude,
      latitude: response.data.result.latitude,
    };
    return result;
  } catch (err) {
    console.log(err);
  }
}

export const handleSignUp = async ({ email, password, username, postcode }) => {
  let newUser = {};

  try {
    const { longitude, latitude } = await convertPostcode(postcode).catch();

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    newUser = {
      uid: userCredential.user.uid,
      email: email,
      username: username,
      longitude: longitude,
      latitude: latitude,
      avatar_url: "",
      books: [],
      chats: [],
      lent: 0,
    };

    await setDoc(doc(db, "users", userCredential.user.uid), newUser);

    return newUser.uid;
  } catch (err) {
    console.log(err);
  }
};

export const handleLogin = async (password, email) => {
  return signInWithEmailAndPassword(auth, email, password).then(
    (userCredential) => {
    
      return userCredential.user.uid;
    }
  );
};

export const sendBook = async (bookObject, user) => {
  const docRef = doc(db, "users", user);

  await updateDoc(docRef, {
    books: arrayUnion(bookObject),
  });
};

// export const getBooksByLocation(lat, long, distance) {

// }

export const getUserDetails = async (uid) => {
  const docRef = doc(db, 'users', `${uid}`);

  const user = await getDoc(docRef)
  const data = user.data()
  return data.email
}