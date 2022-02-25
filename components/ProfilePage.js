import React, { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../contexts/User";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons, Foundation, MaterialIcons } from "@expo/vector-icons";
import MapButton from "./MapButton";
import TreeIcon from "./TreeIconLink";
import UserRatingLink from "./UserRatingLink";
import BooksOfferedLink from "./BooksOfferedLink";
import BooksHomedLink from "./BooksRehomedLink";

export default function ProfilePage({ navigation }) {
  const [showSingleBook, setSingleBook] = useState(false);

  const usersbooks = [
    {
      id: "Hellboy",
      cover:
        "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1396092162l/21797255.jpg",
    },
    {
      id: "Ender",
      cover:
        "https://upload.wikimedia.org/wikipedia/en/thumb/e/e4/Ender%27s_game_cover_ISBN_0312932081.jpg/220px-Ender%27s_game_cover_ISBN_0312932081.jpg",
    },
    {
      id: "Hellbound",
      cover: "https://m.media-amazon.com/images/I/51TVrzNamQL._SL500_.jpg",
    },
    {
      id: "Rings",
      cover: "https://m.media-amazon.com/images/I/51nfKQgGgZL.jpg",
    },
    { cover: "https://blackwells.co.uk/jacket/l/9780062094353.jpg" },
    {
      id: "Kitchen",
      cover:
        "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1566425108l/33.jpg",
    },
    {
      id: "Watchers",
      cover: "https://images-na.ssl-images-amazon.com/images/I/71UttNn8ZcL.jpg",
    },
    {
      id: "Cloud",
      cover:
        "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1532695250l/32423._SY475_.jpg",
    },
  ];

  const GetCover = ({ cover }) => {
    return (
      <View style={styles.bookCoverContainer}>
        <Image
          source={{ uri: `${cover}` }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        return navigation.navigate("SingleBookScreen", { item: item });
      }}
    >
      <GetCover cover={item.cover} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.scrollView}>
          <View style={styles.headerIconBar}>
            <Ionicons
              name="ios-arrow-back"
              size={24}
              color="#52575D"
            ></Ionicons>
            <MaterialIcons name="more-vert" size={24} color="black" />
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
              User
            </Text>
            <Text
              style={[
                styles.text,
                { color: "#AEB5BC", fontSize: 14, marginBottom: 10 },
              ]}
            >
              Napper - Hunter - Cat
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
              data={usersbooks}
              renderItem={renderItem}
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
                {usersbooks.length}
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

            <View>
              <Text style={[styles.subText, styles.fav_users]}>
                Favourite users
              </Text>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <View style={styles.avatarContainer}></View>
              </ScrollView>
            </View>
          </View>
        </View>
      </ScrollView>
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
    height: undefined,
    width: undefined,
  },
  headerIconBar: {
    flexDirection: "row",
    justifyContent: "space-between",
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
    width: 230,
    height: 230,
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
    width: 180,
    height: 250,
    borderRadius: 12,
    overflow: "hidden",
    marginHorizontal: 6,
    marginTop: 10,
    marginLeft: 15,
  },
  bookCount: {
    backgroundColor: "#41444B",
    position: "absolute",
    top: "50%",
    marginTop: -200,
    alignSelf: "center",
    width: 70,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    shadowColor: "#f6f4f3",
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 20,
    shadowOpacity: 2,
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
});
