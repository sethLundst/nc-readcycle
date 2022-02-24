import axios from "axios";
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

export function checkUsername(username) {
  const q = query(collection(db, "users"), where("username", "==", username));
  const qsnap = getDocs(q);

  return qsnap.empty;
}

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
  const { longitude, latitude } = await convertPostcode(postcode);
  return createUserWithEmailAndPassword(
    auth,
    email,
    password,
    longitude,
    latitude
  ).then((userCredential) => {
    setDoc(doc(db, "users", userCredential.user.uid), {
      uid: userCredential.user.uid,
      email: email,
      username: username,
      longitude: longitude,
      latitude: latitude,
      avatar: "",
      books: [],
      wishlist: [],
    });
  });
};

export const handleLogin = ({ password, email }) => {
  signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
    console.log(userCredential);
  });
};
