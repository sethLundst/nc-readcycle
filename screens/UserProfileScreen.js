import React, { useCallback, useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../contexts/User";
import {
  StyleSheet,
  Alert,
  Modal,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Pressable,
  Button,
} from "react-native";
import { Ionicons, AntDesign, MaterialIcons } from "@expo/vector-icons";
import MapButton from "./MapButton";
import TreeIcon from "./TreeIconLink";
import UserRatingLink from "./UserRatingLink";
import BooksOfferedLink from "./BooksOfferedLink";
import BooksHomedLink from "./BooksRehomedLink";
import { getUserDetails, uploadProfilePic } from "../db/firestore";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";

export default function UserProfileScreen({ navigation }) {
  const [currentUser, setCurrentUser] = useState({ books: [] });
  const [showModal, setShowModal] = useState(false);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const result = await getUserDetails(user);
      setCurrentUser(result);
    };
    fetchUserDetails();
  }, [user, getUserDetails]);

  const pickImage = async () => {
    console.log("here");
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      uploadProfilePic(result.uri);
      console.log("here");
    }
  };

  function ItemView({ item }) {
    return (
      <View style={styles.bookCoverContainerShadow}>
        <View style={styles.bookCoverContainer}>
          <LinearGradient
            colors={["white", "purple", "blue"]}
            style={styles.background}
          />
          <SafeAreaView>
            <View>
              <Modal
                hasBackdrop={true}
                animationType={"fade"}
                transparent
                visible={showModal}
              >
                <View style={styles.modalBackground}>
                  <View style={styles.modalContainer}>
                    <Pressable onPress={() => setShowModal(!showModal)}>
                      <View style={styles.removeBookIconContainer}>
                        <MaterialIcons
                          name="highlight-remove"
                          size={28}
                          color="black"
                          style={styles.removeBookIcon}
                        />
                      </View>
                    </Pressable>
                    <View style={styles.modalInfo}>
                      <Text style={styles.modalText}>
                        Did you rehome this book?
                      </Text>

                      <TouchableOpacity style={styles.yesButton}>
                        <Text style={styles.yesText}>Yes</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={styles.noButton}>
                        <Text style={styles.noText}>No</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
              <Modal
                hasBackdrop={true}
                animationType={"fade"}
                transparent
                visible={showModal}
              >
                <View style={styles.modalBackground}>
                  <View style={styles.modalContainer}></View>
                </View>
              </Modal>
            </View>
          </SafeAreaView>
          <View style={styles.iconBackground}>
            <MaterialIcons
              onPress={() => setShowModal(!showModal)}
              style={styles.removeBookIconCover}
              name="highlight-remove"
              size={28}
              color="white"
            />
          </View>

          <TouchableOpacity
            key={item.id}
            style={styles.image}
            onPress={() => {
              navigation.navigate("SingleBookScreen", { item });
            }}
          >
            <Image
              source={{
                uri: item.highResImage,
              }}
              style={styles.coverImage}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={["#dee2ff", "#f7edf2", "white"]}
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
      <View style={styles.scrollView}>
        <View style={styles.headerIconBar}>
          <Ionicons name="ios-arrow-back" size={24} color="#52575D"></Ionicons>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("EditProfileScreen");
            }}
          >
            <View style={styles.ios_settings_outline}>
              <Ionicons
                name="ios-settings-outline"
                size={22}
                color="#DFD8C8"
              ></Ionicons>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.profileShadow}>
          <View style={styles.profileImageContainer}>
            <Image
              source={require("../assets/cat.png")}
              style={styles.profileImage}
            ></Image>
          </View>

          {/* <View style={styles.activeDot}></View> */}
        </View>

        <View style={styles.usernameContainer}>
          <Text style={styles.username}>
            {currentUser ? currentUser.username : "Loading..."}
          </Text>
        </View>

        <View style={styles.iconsContainer}>
          <View style={styles.iconBox}>
            <BooksHomedLink />
          </View>
          <View
            style={[
              styles.iconBox,
              {
                borderColor: "#DFD8C8",
                borderLeftWidth: 1,
                borderRightWidth: 1,
              },
            ]}
          >
            <BooksOfferedLink />
          </View>
          <View
            style={[
              styles.iconBox,
              {
                borderColor: "#DFD8C8",
                borderRightWidth: 1,
              },
            ]}
          >
            <MapButton />
          </View>
          <View style={styles.iconBox}>
            <TreeIcon />
          </View>
        </View>

        <View style={{ marginTop: 32 }}>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_item, index) => index}
            data={currentUser.books}
            renderItem={ItemView}
          ></FlatList>

          <View style={styles.bookCount}>
            <Text
              style={[
                styles.text,
                {
                  fontSize: 24,
                  color: "#DFD8C8",
                  fontWeight: "300",
                  paddingTop: 0,
                },
              ]}
            >
              {currentUser.books.length}
            </Text>
            <Text
              style={[
                styles.text,
                {
                  fontSize: 10,
                  color: "#DFD8C8",
                  textTransform: "uppercase",
                  textAlign: "center",
                },
              ]}
            >
              Books on offer
            </Text>
          </View>
        </View>

        <View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.avatarContainer}></View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  scrollView: {
    flex: 1,
  },
  text: {
    fontFamily: "HelveticaNeue",
    color: "#52575D",
  },
  headerIconBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginHorizontal: 16,
  },
  backButton: {},
  ios_settings_outline: {
    marginTop: 10,
    backgroundColor: "#41444B",
    width: 30,
    height: 30,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "white",
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 5,
    shadowRadius: 15,

    elevation: 7,
  },
  profileShadow: {
    alignItems: "center",
    shadowColor: "white",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 5,
    shadowRadius: 15,

    elevation: 7,
  },
  profileImageContainer: {
    width: 150,
    height: 150,
    borderRadius: 100,
    alignItems: "center",
    overflow: "hidden",
    marginBottom: 0,
    borderColor: "#8d99ae",
    borderWidth: 0.2,
  },
  profileImage: {
    flex: 1,
    height: 150,
    width: 150,
    alignItems: "center",
    resizeMode: "cover",
  },
  usernameContainer: {
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "#41444B",
    marginTop: 15,
    marginBottom: 5,
    borderRadius: 12,
    shadowColor: "white",
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 5,
    shadowRadius: 15,

    elevation: 7,
  },
  username: {
    fontSize: 18,
    fontFamily: "HelveticaNeue",
    color: "#DFD8C8",
    fontWeight: "900",
    margin: 5,
    padding: 3,
  },

  subText: {
    fontSize: 12,
    color: "#AEB5BC",
    textTransform: "uppercase",
    fontWeight: "500",
  },

  // activeDot: {
  //   backgroundColor: "#34FFB9",
  //   position: "absolute",
  //   bottom: 28,
  //   left: 10,
  //   padding: 4,
  //   height: 20,
  //   width: 20,
  //   borderRadius: 10,
  // },

  iconsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  iconBox: {
    alignItems: "center",
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
  },
  bookCount: {
    backgroundColor: "#41444B",
    position: "absolute",
    marginTop: -35,
    alignSelf: "center",
    width: 70,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,

    shadowColor: "white",
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 5,
    shadowRadius: 15,

    elevation: 7,
  },
  bookCoverContainerShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 7,

    elevation: 10,
  },
  bookCoverContainer: {
    borderRadius: 10,
    borderColor: "#8d99ae",
    borderWidth: 0.5,
    overflow: "hidden",
    width: 180,
    height: 265,
    marginHorizontal: 13,
    marginTop: 55,
    marginBottom: 10,
  },
  coverImage: {
    width: 185,
    height: 270,

    borderRadius: 5,
  },

  removeBookIcon: {
    marginBottom: 5,
  },
  removeBookIconCover: {
    position: "absolute",
    alignSelf: "center",
    zIndex: 100,
    right: 1,
  },
  iconBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 25,
    width: 25,
    borderRadius: 12.5,
    position: "absolute",
    top: 3,
    zIndex: 105,
    right: 1,
    backgroundColor: "#41444B",
    shadowColor: "#f6f4f3",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },

  // modal
  modalContainer: {
    // flex: 1,
    justifyContent: "center",
    // marginTop: 250,
    // marginBottom: 250,
    // marginLeft: 50,
    // marginRight: 50,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 20,
    marginBottom: 10,
  },
  modalBackground: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalInfo: {
    alignItems: "center",
  },
  yesButton: {
    borderWidth: 1,
    borderRadius: 25,
    alignItems: "center",
    width: 80,
    marginBottom: 10,
  },
  noButton: {
    borderWidth: 1,
    borderRadius: 25,
    alignItems: "center",
    width: 80,
  },
  yesText: {
    fontSize: 20,
  },
  noText: {
    fontSize: 20,
  },
});
