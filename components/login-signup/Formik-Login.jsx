import React, {useContext} from "react";
import { Button, TextInput, View, Text, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { handleLogin, checkEmailIsOnSystem } from "../../db/firestore";
import validator from "validator";
import { UserContext } from "../../contexts/User";


const validationSchema = Yup.object({
  email: Yup.string()
    .ensure()
    .test("is valid", "invalid email", validator.isEmail)
    .test("isOnSystem", "Email not on system", checkEmailIsOnSystem)
    .required("E-mail required."),
    password: Yup.string().ensure().required("Password required."),
});

export const LoginForm = ({ navigation }) => {
  const { user, setUser } = useContext(UserContext);
  console.log(user, '<= user');
  return (
  <Formik
    initialValues={{ email: "", password: "" }}
    onSubmit={(values) =>
      handleLogin(values.password, values.email).then((uid) => {
        setUser(uid)
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
          secureTextEntry
        />
        {errors.password && touched.password && <Text>{errors.password}</Text>}
        <Button onPress={handleSubmit} title="Log in." />
      </View>
    )}
  </Formik>
)};

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    margin: 5,
  },
});
