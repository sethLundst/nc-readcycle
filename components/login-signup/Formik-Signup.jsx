//TODO : password confirm, validate email
import axios from "axios";
import React from "react";
import { Button, TextInput, View, Text, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { checkEmailIsAvailable, handleSignUp } from "../../db/firestore";
import validator from "validator";

const pwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,20}$/;
const pwordErrMsg =
  "Password must be 7-20 characters long\nwith at least one uppercase letter,\none lowercase letter and one number.";
const postcodeRegex = /^[a-z]{1,2}\d[a-z\d]?\s*\d[a-z]{2}$/i;

const api = axios.create({
  baseURL: "https://api.postcodes.io",
});

async function validatePostcode(postcode) {
  try {
    const response = await api.get(`/postcodes/${postcode}/validate`);
    return response.data.result;
  } catch (err) {
    console.log(err);
  }
}

const validationSchema = Yup.object({
  email: Yup.string()
    .ensure()
    .required("E-mail required.")
    .test("is valid", "invalid email", validator.isEmail)
    .test("isAvailable", "Email in use", checkEmailIsAvailable),
  password: Yup.string()
    .ensure()
    .required("Password required.")
    .matches(pwordRegex, pwordErrMsg),
  username: Yup.string()
    .ensure()
    .max(20, "Username must be 20 characters or under")
    .required("Username required."),
  postcode: Yup.string()
    .ensure()
    .matches(postcodeRegex, "Invalid post code.")
    .test("Postcode exists", "Postcode does not exist", validatePostcode)
    .required("Postcode required."),
});

export const SignupForm = ({ navigation }) => (
  <Formik
    initialValues={{ email: "", password: "", username: "", postcode: "" }}
    onSubmit={(values) =>
      handleSignUp(values).then(() => {
        navigation.navigate("HomeScreen");
      })
    }
    validationSchema={validationSchema}
  >
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
          secureTextEntry={true}
        />
        {errors.password && touched.password && <Text>{errors.password}</Text>}
        <TextInput
          placeholder="username"
          style={styles.textInput}
          onChangeText={handleChange("username")}
          onBlur={handleBlur("username")}
          value={values.username}
        />
        {errors.username && touched.username && <Text>{errors.username}</Text>}
        <TextInput
          placeholder="postcode"
          style={styles.textInput}
          onChangeText={handleChange("postcode")}
          onBlur={handleBlur("postcode")}
          value={values.postcode}
        />
        {errors.postcode && touched.postcode && <Text>{errors.postcode}</Text>}
        <Button onPress={handleSubmit} title={"Submit"} />
      </View>
    )}
  </Formik>
);

{
  /* <TouchableOpacity style={styles.button} onPress={handleRegisterClick}>
<Text style={styles.buttonText}>Register.</Text>
</TouchableOpacity> */
}

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    margin: 5,
  },
});
