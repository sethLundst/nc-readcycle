import React, { useContext, useEffect, useState } from "react";
import { Formik } from "formik";
import { addMessage, getChat, getUserDetails } from "../db/firestore";
import { getDoc, getFirestore, Timestamp } from "firebase/firestore";
import { UserContext } from "../contexts/User";
import { SafeAreaView } from "react-native-safe-area-context";
const timestamp = require("time-stamp");
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  Image,
} from "react-native";

export default function SingleMessageScreen({ route, navigation }) {
  const { user } = useContext(UserContext);
  const { chatID } = route.params;
  const [currUser, setCurrUser] = useState("");
  const [otherUser, setOtherUser] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  const Comment = (props) => {
    const { item } = props;

    const time = item.postedAt.slice(0, 10) + " " + item.postedAt.slice(11, 16);
    return (
      <View style={styles.comment}>
        <Text>
          {item.username} {time}
        </Text>
        <Text>{item.message}</Text>
      </View>
    );
  };

  function handleChange(value) {
    setNewMessage(value);
  }

  function handleSubmit() {
    addMessage(chatID, currUser.username, newMessage).then(() => {
      setMessages((curr) => [
        ...curr,
        {
          username: currUser.username,
          message: newMessage,
          postedAt: timestamp("DD/MM/YYYY:HH:mm:ss:ms"),
        },
      ]);
      setNewMessage("");
    });
  }

  useEffect(async () => {
    setIsLoading(true);
    const chat = await getChat(chatID);
    const currUser = await getUserDetails(user);
    setCurrUser(currUser);
    const msgs = [];
    console.log(chat);
    if (chat.messages.length > 0) {
      chat.messages.forEach((message) => {
        msgs.push(message);
      });
      setMessages(msgs);
    }
    for (const user of chat.members) {
      if (user !== currUser.uid) {
        const otherUserObj = await getUserDetails(user);
        setImage(chat.picture);
        setOtherUser(otherUserObj);
      }
    }

    setTitle(chat.book);

    setIsLoading(false);
  }, []);

  return isLoading ? (
    <Text>Loading...</Text>
  ) : (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={styles.header}>
        <View style={styles.imageBackground}>
          <Image
            style={styles.pic}
            source={{
              uri: image,
            }}
          />
        </View>
        <Text>
          {title} || {otherUser.username}
        </Text>
      </View>
      <View style={styles.list}>
        <FlatList
          data={messages}
          renderItem={Comment}
          keyExtractor={(item, index) => item.postedAt + index}
        />
      </View>
      <TextInput
        placeholder="New message"
        style={styles.textInput}
        onChangeText={handleChange}
        value={newMessage}
        multiline={true}
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

    width: 55,
    height: 55,
    backgroundColor: "white",
    margin: 10,
    padding: 8,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "red",
    borderWidth: 1,
  },
  textInput: {
    borderWidth: 1,

    width: 300,
    height: "15%",
    backgroundColor: "white",
    margin: 10,
    padding: 8,
    borderRadius: 3,
  },
  header: {
    height: "20%",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    margin: 10,
  },
  list: {
    height: "50%",
    margin: 10,
  },
  comment: {
    backgroundColor: "white",
    padding: 8,
    margin: 1,
    borderRadius: 3,
  },
	imageBackground: {
	  marginTop: 0,
    height: 104,
    width: 104,
    borderRadius: 100,
    shadowColor: "grey",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 5,
    shadowRadius: 6,

    elevation: 3,
    borderColor: "white",
    borderWidth: 2,
  },
  pic: {
    height: 100,
    width: 100,
    borderRadius: 100,
  },
});
