import React, { useContext, useEffect, useState } from "react";
import { Formik } from "formik";
import { addMessage, getChat, getUserDetails } from "../db/firestore";
import { getDoc, getFirestore } from "firebase/firestore";
import { UserContext } from "../contexts/User";
import {
  Button,
  TextInput,
  View,
  Text,
  StyleSheet,
  Pressable,
  useWindowDimensions,
} from "react-native";

export default function SingleMessageScreen({ route, navigation }) {
  const { user } = useContext(UserContext);
  const { chatID } = route.params;
  const [username, setUsername] = useState("");
  const [newMessage, setNewMessage] = useState("");

  function handleChange(value) {
    setNewMessage(value);
  }

  function handleSubmit() {
    addMessage(chatID, username, newMessage);
    setNewMessage("");
  }

  useEffect(async () => {
    const chat = await getChat(chatID);
    const { username } = await getUserDetails(user);
    setUsername(username);
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Single msg screen</Text>
      <TextInput
        placeholder="New message"
        style={styles.textInput}
        onChangeText={handleChange}
        value={newMessage}
      />
      <Pressable style={styles.submit} onPress={handleSubmit}>
        <Text>Send</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  submit: {
    borderWidth: 1,
    marginLeft: 5,
    paddingLeft: 5,
    width: 55,
    height: 55,
    backgroundColor: "white",
    margin: 10,
    padding: 8,
    borderRadius: 14,
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
