import * as React from "react";
import { useContext } from "react";
import { Button, TextInput, View, Text, StyleSheet } from "react-native";
import { Formik } from "formik";
import validator from "validator";
import * as Yup from "yup";
import { handleLogin, checkEmailIsOnSystem } from "../db/firestore";
import { UserContext } from "../contexts/User";

const validationSchema = Yup.object({
  email: Yup.string()
    .ensure()
    .test("is valid", "invalid email", validator.isEmail)
    .test("isOnSystem", "Email not on system", checkEmailIsOnSystem)
    .required("E-mail required."),
  password: Yup.string().ensure().required("Password required."),
});

export default function LogInScreen({ navigation }) {
  const { user, setUser } = useContext(UserContext);
  return (
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
          <View>
            <View style={styles.formSection}>
              <Text>Email:</Text>
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
              <Text>Password:</Text>
              <TextInput
                placeholder="password"
                style={styles.textInput}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                secureTextEntry
              />
            </View>
            {errors.password && touched.password && (
              <Text>{errors.password}</Text>
            )}
            <Button onPress={handleSubmit} title="Log in." />
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    marginLeft: 5,
    paddingLeft: 5,
  },
  formSection: {
    flexDirection: "row",
    margin: 5,
  },
});
