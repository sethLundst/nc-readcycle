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
import { LinearGradient } from "expo-linear-gradient";

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
      <LinearGradient
        // Background Linear Gradient
        colors={["#dee2ff", "#f7edf2", "white"]}
        start={{
          x: 0,
          y: 0,
        }}
        end={{
          x: 1,
          y: 1,
        }}
        style={styles.background}
      />
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
            {errors.email && touched.password && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
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
              <Text style={styles.errorText}>{errors.password}</Text>
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
              <Text style={styles.errorText}>{errors.username}</Text>
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
            {errors.city && touched.city && (
              <Text style={styles.errorText}>{errors.city}</Text>
            )}
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
              <Text style={styles.errorText}>{errors.postcode}</Text>
            )}
            <View style={styles.createButtonContainer}>
              <Pressable style={styles.button} onPress={handleSubmit}>
                <Text style={styles.Buttontext}>Create an account</Text>
              </Pressable>
            </View>
          </View>
        )}
      </Formik>
      <View style={styles.alreadyButtonContainer}>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("LogInScreen")}
        >
          <Text style={styles.Buttontext}>Already have an account?</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  logo: {
    fontSize: 20,
    padding: 5,
    color: "green",
  },
  formSection: {
    backgroundColor: "#FFC0CB",
    // backgroundColor: "#ffbd03",
    borderRadius: 25,
    width: 250,
    height: 45,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "white",
    borderWidth: 2,
    fontFamily: "HelveticaNeue",
  },

  textInput: {
    height: 70,
    flex: 1,
    padding: 10,
    fontFamily: "HelveticaNeue",
    color: "white",
    fontSize: 18,
    fontWeight: "800",
  },
  errorText: {
    fontFamily: "HelveticaNeue",
    color: "#52575D",
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
  },
  createButtonContainer: {
    marginTop: 40,
  },
  alreadyButtonContainer: {
    marginTop: 15,
  },
  button: {
    backgroundColor: "#76c893",
    borderRadius: 25,
    borderColor: "white",
    borderWidth: 2,

    shadowColor: "#fad2e1",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 17,

    elevation: 10,
  },
  Buttontext: {
    alignSelf: "center",
    fontSize: 20,
    fontFamily: "HelveticaNeue",
    color: "white",
    padding: 12,
  },
});
