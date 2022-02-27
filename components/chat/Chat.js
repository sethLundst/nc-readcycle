import React, { useContext, useEffect, useState } from "react";
import { Formik } from "formik";
import { getUserDetails, db, app, auth } from "../../db/firestore";
import { UserContext } from "../../contexts/User";
import { getDoc, getFirestore } from "firebase/firestore";
import {
	Button,
	TextInput,
	View,
	Text,
	StyleSheet,
	useWindowDimensions,
} from "react-native";

const Chat = ({chatID}) => {

  const [chatLog, setChatLog] = useState(null)
  useEffect(()=>{

  }, {})

	return <View>yo</View>;
};

export default Chat;
