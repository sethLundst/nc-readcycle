import React from "react";
import { Button, TextInput, View, Text, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { checkEmail, handleLogin} from "../../db/firestore";
import validator from "validator";

const validationSchema = Yup.object({
	email: Yup.string()
		.ensure()
		.required("E-mail required.")
		.test("is valid", "invalid email", validator.isEmail),
		// .test("isAvailable", "Email in use", checkEmail),
	password: Yup.string()
		.ensure()
		.required("Password required.")
});

export const LoginForm = (props) => (
	<Formik
		initialValues={{ email: "", password: ""}}
		onSubmit={handleLogin}
		validationSchema={validationSchema}>
		{({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
			<View>
				<TextInput
					placeholder="email"
					style={styles.textInput}
					onChangeText={handleChange("email")}
					onBlur={handleBlur("email")}
					value={values.email}
				/>
				{errors.email && touched.password && <Text>{errors.email}</Text>}
				<TextInput
					placeholder="password"
					style={styles.textInput}
					onChangeText={handleChange("password")}
					onBlur={handleBlur("password")}
					value={values.password}
					secureTextEntry
				/>
				{errors.password && touched.password && <Text>{errors.password}</Text>}
				<Button onPress={handleSubmit} title="Log in." />
			</View>
		)}
	</Formik>
);

const styles = StyleSheet.create({
	textInput: {
		borderWidth: 1,
		margin: 5,
	},
});