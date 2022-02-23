import * as React from "react";
import { Button, View, Text } from "react-native";

export default function SignUpScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Form to Sign Up</Text>
      <Button
        title="Already have an account?"
        onPress={() => navigation.navigate("LogInScreen")}
      />
      <Button title="Home" onPress={() => navigation.navigate("HomeScreen")} />
    </View>
  );
}
