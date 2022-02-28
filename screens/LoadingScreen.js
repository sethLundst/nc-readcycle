import * as React from "react";
import { View, Text } from "react-native";
import { useState, useEffect } from "react";
import { auth } from "../db/firestore.js";

export default function LoadingScreen({ navigation }) {

	const [initialRoute, setInitialRoute] = useState("LoadingScreen");

	useEffect(() => {
		auth.onAuthStateChanged((userInfo) => {
			console.log(userInfo);
			if (userInfo) {
				navigation.navigate("BottomTabNavigator");
			} else {
				navigation.navigate("SignUpScreen");
			}
		});
	}, []);
	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<Text>Loading...</Text>
		</View>
	);
}

//something cool later
