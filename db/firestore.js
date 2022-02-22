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
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export const checkEmail = async (email) => {
	const q = query(collection(db, "users"), where("email", "==", email));
	const qsnap = await getDocs(q)
  return qsnap.empty;
}
// export function checkUsername(username) {
// 	const q = query(collection(db, "users"), where("username", "==", username));
// 	const qsnap =  getDocs(q);

//   return qsnap.empty;
// }

export const handleSignUp = ({email, password}) => {
	createUserWithEmailAndPassword(auth, email, password).then(
		(userCredential) => {
			console.log(userCredential.user);
			setDoc(doc(db, "users", userCredential.user.uid), {
				uid: userCredential.user.uid,
				email: email,
			});
		}
	);
};
