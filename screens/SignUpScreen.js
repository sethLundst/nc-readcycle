import * as React from "react";
import { Button, View, Text } from "react-native";
import { SignupForm } from "../components/login-signup/Formik-Signup";

export default function SignUpScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>READCYCLE</Text>
      <Text>Sign Up.</Text>
      <SignupForm/>
      <Button
        title="Already have an account?"
        onPress={() => navigation.navigate("LogInScreen")}
      />
      <Button title="Home" onPress={() => navigation.navigate("HomeScreen")} />
    </View>
  );
}
