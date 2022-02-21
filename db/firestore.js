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
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
const firebaseConfig = {
	apiKey: "AIzaSyAmmM3CBTdIeuOY7KEXouW-SFAHeyA_Ums",
	authDomain: "readcycle-642e1.firebaseapp.com",
	databaseURL: "https://readcycle-642e1-default-rtdb.firebaseio.com",
	projectId: "readcycle-642e1",
	storageBucket: "readcycle-642e1.appspot.com",
	messagingSenderId: "465923556747",
	appId: "1:465923556747:web:0238a1c3993ad960935b8e",
};
import validator from "validator";
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export function getUserByUsername(username) {
	const q = query(collection(db, "users"), where("username", "==", username));
	return getDocs(q).then((qSnap) => {
		return qSnap.docs.data();
	});
}

export const handleSignUp = (email, password) => {
  if  (validator(email)){
	
	createUserWithEmailAndPassword(auth, email, password).then(
		(userCredential) => {
			console.log(userCredential.user);
		}
	)}
};
