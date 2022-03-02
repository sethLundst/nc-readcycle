import * as React from "react";
import { useContext } from "react";
import { Button, TextInput, View, Text, StyleSheet } from "react-native";
import { Formik } from "formik";
import validator from "validator";
import * as Yup from "yup";
import { handleLogin, checkEmailIsOnSystem } from "../db/firestore";
import { UserContext } from "../contexts/User";
import { LinearGradient } from "expo-linear-gradient";

const validationSchema = Yup.object({
  email: Yup.string()
    .ensure()
    .test("is valid", "Invalid email", validator.isEmail)
    .test("isOnSystem", "Email not on system", checkEmailIsOnSystem)
    .required("E-mail required."),
  password: Yup.string().ensure().required("Password required."),
});

export default function LogInScreen({ navigation }) {
  const { user, setUser } = useContext(UserContext);
  return (
    <View style={styles.pageContainer}>
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
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) =>
            handleLogin(values.password, values.email).then((uid) => {
              setUser(uid);
              navigation.navigate("BottomTabNavigator");
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
            <View style={styles.inputContainer}>
              <View style={styles.formSection}>
                {/* <Text style={styles.text}>Email:</Text> */}
                <TextInput
                  placeholder="       email       "
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
                {/* <Text style={styles.text}>Password:</Text> */}
                <TextInput
                  placeholder="    Password    "
                  style={styles.textInput}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  secureTextEntry
                />
              </View>
              {errors.password && touched.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
              <View style={styles.login}>
                <Button onPress={handleSubmit} title="Log in." />
              </View>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    width: "100%",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  inputContainer: {
    alignItems: "center",
    justifyContent: "center",
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
  formSection: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 45,
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "white",
    borderWidth: 2,
    fontFamily: "HelveticaNeue",
  },
  login: {
    width: "80%",
    borderRadius: 25,
    height: 70,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FFC0CB",
    borderColor: "white",
    borderWidth: 2,
    padding: 10,
    shadowColor: "pink",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 17,

    elevation: 10,
  },
  errorText: {
    fontFamily: "HelveticaNeue",
    color: "#52575D",
    fontSize: 15,
    fontWeight: "600",
  },
});
