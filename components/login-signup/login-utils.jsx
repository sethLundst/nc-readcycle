import validate from "validator";
import { handleSignUp, checkEmail, validateUsername } from "../../db/firestore";

export const validateEmail = async (email) => {
	if (!email) {
		return Promise.reject({ msg: "Email address required.", input: "email" });
	}
	if (!validate.isEmail(email)) {
		return Promise.reject({ msg: "Invalid email address.", input: "email" });
	}
	const isAvailable = await checkEmail(email);
	if (!isAvailable) {
		return Promise.reject({ msg: "Email address in use.", input: "email" });
	}
  
};

export const validatePassword = async (pword) => {
	const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,20}$/;
	if (!pword) {
		return Promise.reject({ msg: "Password required.", input: "password" });
	}
	if (!regex.test(pword)) {
		return Promise.reject({
			msg: "Password must be 7-20 characters long\nwith at least one uppercase letter,\none lowercase letter and one number.",
			input: "password",
		});
	}
};
