import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import BarcodeScanner from "./components/BarcodeScanner";

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "./navigation/TabNavigator";
import Login from "./components/login-signup/login";

function App() {
	return (
		<Login></Login>
			// <NavigationContainer>
			// 	<BottomTabNavigator></BottomTabNavigator>
			// </NavigationContainer>
		
	);
}
export default App;
