import React, {useContext} from "react";
import { Button, TextInput, View, Text, StyleSheet } from "react-native";
import { Formik } from "formik";
import {getUserDetails, db, app, auth} from "../../db/firestore"
import { UserContext } from "../../contexts/User";
import { getDoc, getFirestore } from "firebase/firestore";




const Chat = (props) => {

  // const createChat = (uid1, uid2) {

  // }

  return ( 
    <Text>yo</Text>
   );
}
 
export default Chat;