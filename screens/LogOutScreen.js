import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth();

export default function LogOutScreen({ navigation }) {
  const handleLogout = () => {
    signOut(auth).then(() => {
      navigation.navigate("SignUpScreen");
    });
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TouchableOpacity onPress={handleLogout} style={styles.button}>
        <Text>Log Out.</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    padding: 5,
  },
});
