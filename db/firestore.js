import axios from "axios";
import { initializeApp } from "firebase/app";
import React, { useContext } from "react";
import { UserContext } from "../contexts/User";
import { getDoc, getFirestore } from "firebase/firestore";
import { getDistance, convertDistance } from "geolib";
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
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
} from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAmmM3CBTdIeuOY7KEXouW-SFAHeyA_Ums",
  authDomain: "readcycle-642e1.firebaseapp.com",
  databaseURL: "https://readcycle-642e1-default-rtdb.firebaseio.com",
  projectId: "readcycle-642e1",
  storageBucket: "readcycle-642e1.appspot.com",
  messagingSenderId: "465923556747",
  appId: "1:465923556747:web:0238a1c3993ad960935b8e",
};
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

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
    console.log(response.data.european_electoral_region);
    const result = {
      longitude: response.data.result.longitude,
      latitude: response.data.result.latitude,
      region: response.data.result.european_electoral_region,
    };
    return result;
  } catch (err) {
    console.log(err);
  }
}

export const handleSignUp = async ({
  email,
  password,
  username,
  postcode,
  city,
}) => {
  let newUser = {};

  try {
    await setPersistence(auth, browserLocalPersistence);

    const { longitude, latitude, region } = await convertPostcode(
      postcode
    ).catch();

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    newUser = {
      uid: userCredential.user.uid,
      email: email,
      username: username,
      avatar_url: "", //placeholder?
      books: [],
      chats: [],
      lent: 0,
      coordinates: { latitude: latitude, longitude: longitude },
      region: region,
      city: city,
    };

    await setDoc(doc(db, "users", userCredential.user.uid), newUser);
    console.log("done");
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

export const getUsersByLocation = async (region) => {
  const q = query(collection(db, "users"), where("location", "==", region));
};

export const getUserDetails = async (uid) => {
  const docRef = doc(db, "users", `${uid}`);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};

export const deleteBook = async (book, isLent) => {};

export const createChat = async (members, book) => {
  const chatKey = `${members[0]}${members[1]}${book.id}`;
  const q = query(
    collection(db, "users"),
    where("chats", "array-contains", chatKey)
  );
  const qsnap = await getDocs(q);

  if (qsnap.empty) {
    const docRef = doc(db, "users", members[0]);
    await updateDoc(docRef, { chats: arrayUnion(chatKey) });
    await setDoc(doc(db, "chats", chatKey), {
      members: members,
      book: book.title,
      book_id: book.id,
      // picture: book.altImage,
      messages: [],
      id: chatKey,
    });
  }
  return chatKey;
};

export const getAllUsers = async () => {
  let result = [];

  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    result.push(doc.data());
  });

  return result;
};

export const uploadProfilePic = async (uri) => {
  const storage = getStorage();
  const picRef = ref(storage, "profilepic.jpg");
  const img = await fetch(uri);
  const bytes = await img.blob();

  await uploadBytes(picRef, bytes);

  const profilePicture = await getDownloadURL(picRef);

  await updateDoc(doc(db, "users", auth.currentUser.uid), {
    avatar_url: profilePicture,
  });
};

export const getChat = async (chatID) => {
  const docRef = doc(db, "chats", `${chatID}`);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};

export const addMessage = async (chatID, username, data) => {
  const messageObject = {
    username: username,
    message: data,
  };
  const docRef = doc(db, "chats", chatID);
  await updateDoc(docRef, { messages: arrayUnion(messageObject) });
};
