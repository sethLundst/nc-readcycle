import * as React from "react";
import { View, Text } from "react-native";
import { LoginForm } from "../components/login-signup/Formik-Login";

export default function LogInScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <LoginForm />
    </View>
  );
}
