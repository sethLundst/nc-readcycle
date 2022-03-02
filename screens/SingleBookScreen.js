import { Ionicons, AntDesign } from "@expo/vector-icons";
import React, { useContext, useEffect, useState } from "react";
import { getAllUsers } from "../db/firestore";
import {
  View,
  StyleSheet,
  Image,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { createChat, checkChat } from "../db/firestore";
import { UserContext } from "../contexts/User";


export default function SingleBookScreen({ route, navigation }) {
  const { item } = route.params;
  console.log(item);

  const [userHasBook, setUserHasBook] = useState("");

  const { user, setUser } = useContext(UserContext);

  // console.log([user, userHasBook.uid], item);

  const handleChat = async () => {
    const chatID = await createChat([user, userHasBook.uid], item);
    navigation.navigate("SingleMessageScreen", { chatID: chatID });
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      const result = await getAllUsers();
      // console.log(result, "<< all users");
      // setUserHasBook(result);
      for (let i = 0; i < result.length; i++) {
        if (result[i].uid === item.uid) {
          setUserHasBook(result[i]);
        }
      }
    };
    fetchUserDetails();
  }, [item]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backButtonContainer}>
        <Ionicons name="ios-arrow-back" size={24} color="#52575D"></Ionicons>
      </View>
      <View style={styles.bookBox}>
        <Image
          style={styles.image}
          source={{
            uri: item.highResImage,
          }}
          style={styles.image}
        />
        <View style={styles.infoBox}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.bookInfo}>Average rating: {"TBD"}</Text>
          <Text style={styles.bookInfo}>{item.author}</Text>
          <Text style={styles.bookInfo}>{item.publishedDate}</Text>
          <Text style={styles.bookInfo}>{item.pageCount} Pages</Text>
          <Text style={styles.bookInfo}>Language: {item.language}</Text>
          <TouchableOpacity style={styles.messageOwnerButton}>
            <Text style={styles.buttonText}>Message Owner</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <Text style={styles.descriptionHeader}>Description</Text>
        <ScrollView style={styles.descriptionBox}>
          <Text style={styles.description}>{item.description}</Text>
        </ScrollView>

        <View style={styles.userHasBook}>
          <View style={styles.avatarContainer}>
            <Image
              source={require("../assets/cat.png")}
              style={styles.avatarImage}
              resizeMode="center"
            ></Image>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>
              {userHasBook.username} has this!
            </Text>
            <Text style={styles.userDistance}>{item.distance} miles away</Text>
          </View>
          <View style={styles.messageIcon}>
            <TouchableOpacity onPress={handleChat}>
              <AntDesign name="message1" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "95%",
  },
  backButtonContainer: {
    marginTop: 20,
  },
  bookBox: {
    flex: 1,
    flexBasis: 180,
    flexDirection: "row",
    marginBottom: 30,
  },
  infoBox: {
    flexBasis: 300,
  },
  image: {
    marginRight: 30,
    marginLeft: 10,
    top: 20,
    width: 150,
    height: 220,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  title: {
    marginTop: 25,
    width: "60%",
    fontFamily: "HelveticaNeue",
    color: "#52575D",
    fontWeight: "700",
    fontSize: 15,
    paddingBottom: 15,
  },
  bookInfo: {
    paddingBottom: 6,
    fontFamily: "HelveticaNeue",
    color: "#52575D",
    fontWeight: "600",
  },
  descriptionBox: {
    height: 150,
    marginTop: 10,
    marginBottom: 10,
    borderColor: "#DFD8C8",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  description: {
    width: "100%",
    marginTop: 0,
    marginBottom: 5,
    fontFamily: "HelveticaNeue",
    color: "#52575D",
  },
  descriptionHeader: {
    fontSize: 22,
    fontWeight: "500",
    marginTop: 35,
    marginBottom: 0,
    marginLeft: 11,
    fontFamily: "HelveticaNeue",
    color: "#52575D",
  },
  buttonsContainer: {
    marginTop: 0,
    marginBottom: 0,
  },
  messageOwnerButton: {
    borderColor: "#52575D",
    borderWidth: 2,
    borderRadius: 12,
    marginTop: 14,
    padding: 10,
    width: 160,
    height: 40,
    backgroundColor: "#ffbd03",
    shadowColor: "#52575D",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
  },
  buttonText: {
    textAlign: "center",
    fontFamily: "HelveticaNeue",
    color: "#52575D",
    fontWeight: "700",
  },
  userHasBook: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  avatarContainer: {
    height: 30,
    width: 50,
    borderRadius: 40,
    borderWidth: 1,
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
    borderColor: "#41444B",
    shadowColor: "#52575D",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    justifyContent: "center",
  },
  avatarImage: {
    height: 48,
    width: 48,
    borderRadius: 20,
    overflow: "hidden",
  },
  messageIcon: {
    marginRight: 20,
  },

  userAvatarsBox: {
    height: 100,
    padding: 10,
    marginBottom: 30,
  },
});
