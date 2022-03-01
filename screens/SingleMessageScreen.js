import React, { useContext, useEffect, useState } from "react";
import { Formik } from "formik";
import { getChat } from "../db/firestore";
import { UserContext } from "../contexts/User";
import { getDoc, getFirestore } from "firebase/firestore";
import {
	Button,
	TextInput,
	View,
	Text,
	StyleSheet,
	useWindowDimensions,
} from "react-native";

export default function SingleMessageScreen({ route, navigation }) {
	const { chatID } = route.params;
	
  

	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<Text>Single msg screen</Text>
		</View>
	);
}
