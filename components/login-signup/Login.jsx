import { Text, View, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";
import { KeyboardAvoidingView, TouchableOpacity } from "react-native-web";
import validate from "validator"
import { handleSignUp } from "../../db/firestore";

const Login = () => {
	const [email, changeEmail] = useState("");
	const [password, changePassword] = useState("");

  const validateNewUser = ()=>{
    if (validate.isEmail(email)){
      handleSignUp(email, password)
    }
  }
	

	return (
		<View style={styles.container}>
			<View style={styles.headerContainer}>
				<Text style={styles.header}>Readcycle.</Text>
			</View>
			<View style={styles.form}>
				<KeyboardAvoidingView behavior="padding" style={styles.inputContainer}>
					<TextInput
						placeholder="email"
						value={email}
						type="emailAddress"
						onChangeText={(text) => changeEmail(text)}
						style={styles.text_input}
						keyboardType="email-address"></TextInput>

					<TextInput
						placeholder="password"
						value={password}
						onChangeText={(text) => changePassword(text)}
						style={styles.text_input}
						secureTextEntry></TextInput>
				</KeyboardAvoidingView>

				<View style={styles.buttonContainer}>
					<TouchableOpacity style={styles.button}>
						<Text style={styles.buttonText}>Log in.</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.button}
						onPress={() => validateNewUser()}>
						<Text style={styles.buttonText}>Register.</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		height: "70%",
		backgroundColor: "white",
	},
	inputContainer: {
		width: "85%",
	},
	headerContainer: {
		height: "40%",
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},

	header: {
		fontSize: "14vw",
		fontFamily: "courier new",
		fontStyle: "italic",
		fontWeight: "bold",
		color: "deeppink",
		textShadowColor: "midnightblue",
		textShadowOffset: { width: "-1.2vw", height: "-1.2vw" },
	},
	form: {
		width: "90%",
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		alignContent: "center",
		textAlign: "center",
	},
	text_input: {
		textAlign: "center",
		backgroundColor: "azure",
		padding: 8,
		margin: 8,
		borderRadius: 3,
		fontSize: "4.5vw",

		fontFamily: "Courier",
		color: "midnightblue",
	},
	button: {
		backgroundColor: "azure",
		padding: 10,
		margin: 8,
		borderRadius: 3,
    shadowColor: "midnightblue",
    shadowOffset: { width: "-1.2vw", height: "-1.2vw" },
	},
	buttonContainer: {
		marginTop: 16,
	},
	buttonText: {
		fontFamily: "Courier",
		color: "midnightblue",
		fontWeight: "bold",
		fontSize: "4.5vw",
	},
});

export default Login;
