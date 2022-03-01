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
import { getUserDetails } from "../db/firestore";

export default function ProfilePage({ navigation }) {
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

  function ItemView({ item }) {
    return (
      <View style={styles.bookCoverContainer}>
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
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      
        <View style={styles.scrollView}>
          <View style={styles.headerIconBar}>
            {/* <Ionicons
              name="ios-arrow-back"
              size={24}
              color="#52575D"
            ></Ionicons> */}
            <MaterialIcons name="more-vert" size={30} color="black" />
          </View>

          <View style={{ alignSelf: "center" }}>
            <View style={styles.profileImage}>
              <Image
                source={require("../assets/cat.png")}
                style={styles.image}
                resizeMode="center"
              ></Image>
            </View>
            <View style={styles.ios_settings_outline}>
              <Ionicons
                name="ios-settings-outline"
                size={22}
                color="#DFD8C8"
              ></Ionicons>
            </View>
            <View style={styles.activeDot}></View>
            <MapButton />
          </View>

          <View style={styles.userDetailsContainer}>
            <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>
              {}
            </Text>
            <Text>{currentUser ? currentUser.username : "Loading..."}</Text>
            <Text
              style={[
                styles.text,
                { color: "#AEB5BC", fontSize: 14, marginBottom: 10 },
              ]}
            >
              Napper - Hunter - Cat
            </Text>
            <TouchableOpacity
              style={styles.userBtn}
              onPress={() => {
                navigation.navigate("EditProfileScreen");
              }}
            >
              <Text style={styles.userBtnText}>Edit</Text>
            </TouchableOpacity>
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
              <UserRatingLink />
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
              {/* <Text style={[styles.subText, styles.fav_users]}>
                Favourite users
              </Text> */}

              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
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
    backgroundColor: "#FFF",
  },
  scrollView: {
    flex: 1,
  },
  text: {
    fontFamily: "HelveticaNeue",
    color: "#52575D",
  },
  image: {
    flex: 1,
    height: 150,
    width: 150,
    resizeMode: "cover",
  },
  headerIconBar: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
    marginHorizontal: 16,
  },
  subText: {
    fontSize: 12,
    color: "#AEB5BC",
    textTransform: "uppercase",
    fontWeight: "500",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    overflow: "hidden",
    marginBottom: 0,
  },
  ios_settings_outline: {
    backgroundColor: "#41444B",
    position: "absolute",
    top: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  activeDot: {
    backgroundColor: "#34FFB9",
    position: "absolute",
    bottom: 28,
    left: 10,
    padding: 4,
    height: 20,
    width: 20,
    borderRadius: 10,
  },
  location: {
    backgroundColor: "#41444B",
    position: "absolute",
    bottom: 20,
    right: 0,
    width: 40,
    height: 40,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  userDetailsContainer: {
    alignSelf: "center",
    alignItems: "center",
    paddingTop: 0,
  },
  iconsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 12,
  },
  iconBox: {
    alignItems: "center",
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
  },
  bookCoverContainer: {
    width: 178,
    height: 250,
    marginHorizontal: 10,
    marginTop: 55,
    marginBottom: 15,
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 3,
},
shadowOpacity: 0.29,
shadowRadius: 4.65,

elevation: 7,
  },
  coverImage: {
    width: 175,
    height: 250,
    borderRadius: 12,
    borderColor: "#DFD8C8",
    borderWidth: 1,
},
  bookCount: {
    backgroundColor: "#41444B",
    position: "absolute",
    marginTop: -25,
    alignSelf: "center",
    width: 70,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 3,
},
shadowOpacity: 0.29,
shadowRadius: 4.65,

elevation: 7,
  },
  avatarContainer: {
    width: 50,
    overflow: "hidden",
    marginHorizontal: 4,
    marginTop: 10,
    marginBottom: 30,
  },
  fav_users: {
    marginTop: 22,
    marginBottom: 2,
    fontSize: 14,
    fontWeight: "800",
    textAlign: "center",
  },
  removeBookIconContainer: {
    backgroundColor: "black",
    borderRadius: 50,
    position: "absolute",
  },
  removeBookIcon: {
    marginBottom: 5,
  },
  removeBookIconCover: {
    position: "absolute",
    alignSelf: "center",
    zIndex: 100,
    right:1,
  },
  iconBackground: {
    flex: 1,
    justifyContent:"center",
      alignItems:"center",
    height: 25,
    width: 25,
    borderRadius: 12.5,
    position: "absolute",
    top: 2,
    zIndex: 105,
    right: 5,
    backgroundColor: "#41444B",
    shadowColor: "#f6f4f3",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    
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
