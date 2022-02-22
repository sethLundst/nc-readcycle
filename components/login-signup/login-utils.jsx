import validate from "validator";
import { handleSignUp, checkEmail, validateUsername } from "../../db/firestore";

export const validateEmail = async (email) => {

  if (!validate.isEmail(email)){
    return Promise.reject("Invalid email address.")
  } 

  const 

  return checkEmail(email).then((isFree) => {
    if (!isFree) {
      setEmailErr("Email address in use");
    } else if (!email) {
      setEmailErr("Email address required.");
    } else if (!validate.isEmail(email)) {
      setEmailErr("Invalid email address.");
    } else {
      setEmailErr("");
    }
   
  });
};


export const validatePassword = async (pword) => {
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,20}$/;

  if (!pword) {
    setPwordErr("Password required.");
  } else if (!regex.test(pword)) {
    setPwordErr(
      "Password must be 7-20 characters long\nwith at least one uppercase letter,\none lowercase letter and one number."
    );
  } else {
    setPwordErr(setPwordErr(false));
  }
};

