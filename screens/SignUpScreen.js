import * as React from "react";
import { useContext } from "react";
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import {
  checkEmailIsAvailable,
  handleSignUp,
  checkUsername,
} from "../db/firestore";
import { Formik } from "formik";
import { UserContext } from "../contexts/User";
import axios from "axios";
import validator from "validator";
import * as Yup from "yup";
import { Center } from "native-base";
import { getCurrentPositionAsync } from "expo-location";

const api = axios.create({
  baseURL: "https://api.postcodes.io",
});
const pwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,20}$/;
const pwordErrMsg =
  "Password must be 7-20 characters long\nwith at least one uppercase letter,\none lowercase letter and one number.";
const postcodeRegex = /^[a-z]{1,2}\d[a-z\d]?\s*\d[a-z]{2}$/i;

async function validatePostcode(postcode) {
  try {
    const response = await api.get(`/postcodes/${postcode}/validate`);
    return response.data.result;
  } catch (error) {
    console.log(error);
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
    .required("Username required.")
    .test("is available", "username in use", checkUsername),
  postcode: Yup.string()
    .ensure()
    .required("Postcode required.")
    .matches(postcodeRegex, "Invalid post code.")
    .test("Postcode exists", "Postcode does not exist", validatePostcode),
  city: Yup.string().ensure().required("City/town required."),
});

export default function SignUpScreen({ navigation }) {
  const { user, setUser } = useContext(UserContext);
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Readcycle</Text>

      <Formik
        initialValues={{
          email: "",
          password: "",
          username: "",
          postcode: "",
          city: "",
        }}
        onSubmit={(values) =>
          handleSignUp(values).then((uid) => {
            setUser(uid);
            return navigation.navigate("BottomTabNavigator");
          })
        }
        validationSchema={validationSchema}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View>
            <View style={styles.formSection}>
              <TextInput
                placeholder="email"
                style={styles.textInput}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
            </View>
            {errors.email && touched.password && <Text>{errors.email}</Text>}
            <View style={styles.formSection}>
              <TextInput
                placeholder="Password"
                style={styles.textInput}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                secureTextEntry={true}
              />
            </View>
            {errors.password && touched.password && (
              <Text>{errors.password}</Text>
            )}
            <View style={styles.formSection}>
              <TextInput
                placeholder="Username"
                style={styles.textInput}
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                value={values.username}
              />
            </View>
            {errors.username && touched.username && (
              <Text>{errors.username}</Text>
            )}
            <View style={styles.formSection}>
              <TextInput
                placeholder="City/Town"
                style={styles.textInput}
                onChangeText={handleChange("city")}
                onBlur={handleBlur("city")}
                value={values.city}
              />
            </View>
            {errors.city && touched.city && <Text>{errors.city}</Text>}
            <View style={styles.formSection}>
              <TextInput
                placeholder="Postcode"
                style={styles.textInput}
                onChangeText={handleChange("postcode")}
                onBlur={handleBlur("postcode")}
                value={values.postcode}
              />
            </View>
            {errors.postcode && touched.postcode && (
              <Text>{errors.postcode}</Text>
            )}
            <Pressable style={styles.button} onPress={handleSubmit}>
              <Text style={styles.text}>Create an account</Text>
            </Pressable>
          </View>
        )}
      </Formik>

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("LogInScreen")}
      >
        <Text style={styles.text}>Already have an account?</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderStyle: "solid",
    borderColor: "green",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  formSection: {
    flexDirection: "row",
    margin: 5,
  },
  logo: {
    fontSize: 20,
    padding: 5,
    color: "green",
  },
  text: {
    alignSelf: "center",
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
    borderColor: "green",
    borderWidth: 1,
    marginLeft: 5,
    paddingLeft: 5,
    borderRadius: 14,
    padding: 8,
    margin: 8,
  },
  textInput: {
    borderWidth: 1,
    marginLeft: 5,
    paddingLeft: 5,
    width: 300,
    height: 55,
    backgroundColor: "white",
    margin: 10,
    padding: 8,
    borderRadius: 14,
  },
});
