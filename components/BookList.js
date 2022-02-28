import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../contexts/User";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Icon,
  TouchableOpacity,
} from "react-native";
import FilterByDistance from "./FilterByDistance";
import { getUserDetails } from "../db/firestore";
import { getAllUsers } from "../db/firestore";

// import users from "./Users";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  list: {
    width: "100%",
  },
  image: {
    marginTop: 25,
    marginHorizontal: 25,
    marginBottom: 5,
    width: 130,
    height: 165,
  },
  title: {
    width: 130,
    textAlign: "center",
  },
  bookBox: {
    alignItems: "center",
    display: "flex",
    flex: 1,
  },
  searchbarInput: {
    borderColor: "#1323",
    borderWidth: 2,
    borderRadius: 20,
    marginTop: 90,
    padding: 7,
    textAlign: "center",
  },
  treesSaved: {
    marginTop: 10,
  },
  bookFilter: {
    marginTop: 10,
  },
});

const BookList = ({ navigation }) => {
  // console.log(loggedInUser, "<< logged in user");
  // console.log(loggedInUser.address.geo, "<< logged in users location");

  // console.log(
  //   books[0].users.userHas.user[0].username,
  //   "<< user that has this book"
  // );
  // console.log(
  //   books[0].users.userHas.user[0].address.geo,
  //   "<< users location that has this book"
  // );
  // console.log(
  //   books[0].users.userWants.user[0].username,
  //   "<< user that wants this book"
  // );r0

  const [search, setSearch] = useState("");

  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [allBooks, setAllBooks] = useState();
  const { user, setUser } = useContext(UserContext);

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = allBooks.filter((book) => {
        return book.title.toLowerCase().includes(text.toLowerCase());
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(allBooks);
      setSearch(text);
    }
  };

  const ItemView = ({ item }) => {
    return (
      <View style={styles.bookBox}>
        <TouchableOpacity
          key={item.id}
          style={styles.image}
          onPress={() => {
            navigation.navigate("SingleBookScreen", { item });
          }}
        >
          <Image
            style={styles.image}
            source={{
              uri: item.highResImage,
            }}
            style={styles.image}
          />
        </TouchableOpacity>
        <Text style={styles.title}>{item.title}</Text>
        {/* <Text style={styles.title}>{<FilterByDistance />}</Text> */}
      </View>
    );
  };

  useEffect(() => {
    const fetchAllBooks = async (user) => {
      const result = await getAllUsers();
      const books = [];
      for (let i = 0; i < result.length; i++) {
        for (let j = 0; j < result[i].books.length; j++) {
          if (user !== result[i].books[j].uid) {
            books.push(result[i].books[j]);
          }
        }
      }
      setAllUsers(result);
      setFilteredDataSource(books);
      setAllBooks(books);
    };
    fetchAllBooks(user);
  }, [user, getAllUsers]);

  return (
    <View style={styles.container}>
      <View style={styles.searchbarContainer}>
        <TextInput
          style={styles.searchbarInput}
          value={search}
          placeholder="search books..."
          onChangeText={(text) => {
            searchFilterFunction(text);
          }}
        />
      </View>
      <View style={styles.bookFilter}>
        <Text>112 trees saved</Text>
        <Text>Showing {filteredDataSource.length} books...</Text>
      </View>
      <View>
        {/* <Text>filter here ...</Text> */}
        {/* <FilterByDistance /> */}
        {/* <Locations /> */}
      </View>
      <View style={styles.list}>
        <FlatList
          numColumns={2}
          keyExtractor={(_item, index) => index}
          data={filteredDataSource}
          renderItem={ItemView}
        />
      </View>
    </View>
  );
};

export default BookList;
