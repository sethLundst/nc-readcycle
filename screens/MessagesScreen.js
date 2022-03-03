import * as React from "react";
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  SafeAreaView,
  Image,
} from "react-native";
import { getChats, db, getUserDetails } from "../db/firestore";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/User";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { LinearGradient } from "expo-linear-gradient";

export default function MessagesScreen({ route, navigation }) {
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  const [chats, setChats] = useState([
    { messages: [{ postedAt: "", message: "" }] },
  ]);

  const handlePress = (title, ID) => {
    navigation.navigate("SingleMessageScreen", { name: title, chatID: ID });
  };
  const q = query(
    collection(db, "chats"),
    where("members", "array-contains", `${user}`)
  );
  useEffect(() => {
    setIsLoading(true);
    onSnapshot(q, (querySnapshot) => {
      const chats = [];

      querySnapshot.forEach((doc) => {
        chats.push(doc.data());
      });

      setChats(chats);
    });

    setIsLoading(false);
  }, []);

  const Chat = ({ item }) => {
    const chatID = item.id;

    if (item.messages.length) {
      const latestMessage = item.messages[item.messages.length - 1];
      let timestamp = latestMessage.postedAt;
      let time = timestamp.slice(0, 10) + " " + timestamp.slice(11, 16);

      return (
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
          <Pressable
            style={styles.chatThumb}
            onPress={() => handlePress(item.book, chatID)}
          >
            <View style={styles.thumbLeft}>
              <Text style={styles.chatThumbHeader}>{item.book} </Text>
              <View style={styles.chatThumbTextBox}>
                <View style={styles.chatThumbText}>
                  <Text style={styles.chatID}>
                    {latestMessage.username} {time}
                  </Text>
                  <Text style={styles.chatSnippet}>
                    {latestMessage.message.slice(0, 35)}...{" "}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.thumbRight}>
              <View style={styles.imageBackground}>
                <Image
                  style={styles.pic}
                  source={{
                    uri: item.picture,
                  }}
                />
              </View>
            </View>
          </Pressable>
        </SafeAreaView>
      );
    } else {
      return (
        <Pressable style={styles.chatThumb} onPress={() => handlePress(chatID)}>
          <Text style={styles.chatThumbHeader}>{item.book} </Text>
        </Pressable>
      );
    }
  };

  return isLoading ? (
    <Text>All messages</Text>
  ) : (
    <View>
      <FlatList
        data={chats}
        renderItem={Chat}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "white",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "120%",
  },
  header: {
    height: "20%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    height: "50%",
  },
  chatThumb: {
    backgroundColor: "white",
    padding: 8,
    marginHorizontal: 5,
    marginVertical: 2,
    borderRadius: 12,
    flexDirection: "row",
    borderColor: "green",
    borderWidth: 1,
  },
  chatThumbHeader: {
    fontFamily: "HelveticaNeue",
    color: "#52575D",
    fontWeight: "800",
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 7,
    // borderColor: "red",
    // borderWidth: 1,
  },
  imageBackground: {
    height: 79,
    width: 79,
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
    height: 75,
    width: 75,
    borderRadius: 100,
  },
  thumbLeft: {
    width: "55%",
  },
  thumbRight: {
    width: "45%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "flex-end",
    // borderColor: "red",
    // borderWidth: 1,
  },
  chatThumbTextBox: {
    borderColor: "white",
    borderWidth: 3,
    borderRadius: 14,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 5,
    shadowRadius: 4,

    elevation: 3,
  },
  chatThumbText: {
    margin: 0,
    backgroundColor: "#ffbd03",

    // borderColor: "red",
    // borderWidth: 2,
    borderRadius: 10,
    paddingLeft: 8,
    paddingTop: 5,
    paddingBottom: 5,
  },
  chatSnippet: {
    fontFamily: "HelveticaNeue",
    color: "#52575D",
  },
  chatID: {
    fontFamily: "HelveticaNeue",
    color: "black",
    fontWeight: "700",
  },
});
