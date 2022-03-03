import React, { useContext, useEffect, useState } from "react";
import { Formik } from "formik";
import { addMessage, getChat, getUserDetails } from "../db/firestore";
import { getDoc, getFirestore, Timestamp } from "firebase/firestore";
import { UserContext } from "../contexts/User";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
const timestamp = require("time-stamp");
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  Image,
  KeyboardAvoidingView,
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
      <View style={styles.commentBox}>
        <View style={styles.comment}>
          <Text>
            {item.username} {time}
          </Text>
          <Text>{item.message}</Text>
        </View>
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
    <SafeAreaView style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={["#f7edf2", "#dee2ff", "white"]}
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
      <View style={styles.bottomContainer}>
        <KeyboardAvoidingView behavior="padding">
          <TextInput
            placeholder="New message"
            style={styles.textInput}
            onChangeText={handleChange}
            value={newMessage}
            multiline={true}
          />
        </KeyboardAvoidingView>
        <Pressable style={styles.submit} onPress={handleSubmit}>
          <Text>Send</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
    // backgroundColor: "white",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "120%",
  },
  imageBackground: {
    marginTop: 150,
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
  submit: {
    borderRadius: 25,
    borderColor: "#76c893",
    borderWidth: 4,
    width: 65,
    height: 55,
    backgroundColor: "white",
    margin: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomContainer: {
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 80,
  },
  textInput: {
    borderWidth: 2,
    width: 300,
    height: 80,
    marginTop: 100,
    backgroundColor: "white",
    margin: 10,
    padding: 10,
    borderRadius: 10,
    borderColor: "grey",
    shadowColor: "white",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 4,
    shadowRadius: 17,

    elevation: 10,
  },
  header: {
    height: "40%",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    margin: 60,
  },
  list: {
    height: "55%",
    margin: 10,
    marginTop: 60,
  },
  commentBox: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 5,
    shadowRadius: 4,
    elevation: 3,
  },
  comment: {
    margin: 0,
    backgroundColor: "#ffbd03",
    borderColor: "white",
    borderWidth: 3,
    // borderColor: "red",
    // borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
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
