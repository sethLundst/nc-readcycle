import * as React from "react";
import { useEffect, useState } from "react";
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
  SafeAreaView,
} from "react-native";
import { getDistance, convertDistance } from "geolib";
import { getAllUsers, getUserDetails } from "../db/firestore";
import Slider from "./Slider";
import { LinearGradient } from "expo-linear-gradient";

export default function HomeScreen({ navigation }) {
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [allBooks, setAllBooks] = useState();
  const [currentUser, setCurrentUser] = useState();
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
            navigation.navigate("SingleBookScreen", {
              screen: "SingleBookScreen",
              params: { item: item },
            });
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
        <View style={styles.textshadow}>
          <View style={styles.textBox}>
            <Text style={styles.bookText}>{item.title}</Text>
            <Text style={styles.bookText}>({item.distance} miles away)</Text>
          </View>
        </View>
      </View>
    );
  };

  function calculateBookDistance(book, userLocation) {
    const result = convertDistance(
      getDistance(userLocation, {
        latitude: book.coordinates.latitude,
        longitude: book.coordinates.longitude,
      }),
      "mi"
    ).toFixed(2);
    return result;
  }
  let userLocation;
  useEffect(() => {
    const fetchCurrentUser = async (user) => {
      const result = await getUserDetails(user);
      setCurrentUser(result);
    };
    const fetchAllBooks = async (user) => {
      const result = await getAllUsers();
      const books = [];
      let userLocation = {};
      for (let i = 0; i < result.length; i++) {
        for (let j = 0; j < result[i].books.length; j++) {
          if (user !== result[i].books[j].uid) {
            books.push(result[i].books[j]);
          } else {
            userLocation = result[i].books[j].coordinates;
          }
        }
      }
      for (let i = 0; i < books.length; i++) {
        books[i].distance = Number(
          calculateBookDistance(books[i], userLocation)
        );
      }
      const sortedBooks = books.sort((a, b) => {
        return a.distance - b.distance;
      });
      setAllBooks(sortedBooks);
      setAllUsers(result);
      setFilteredDataSource(books);
    };
    fetchCurrentUser(user);
    fetchAllBooks(user);
  }, [user, getAllUsers, getUserDetails]);

  return (
    <SafeAreaView style={styles.pageContainer}>
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
      <View style={styles.pageContainer}>
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
          {/* <View style={styles.sliderContainer}>
            <Slider allBooks={allBooks} />
          </View> */}
        </View>
        <View></View>
        <View style={styles.list}>
          <FlatList
            numColumns={2}
            keyExtractor={(_item, index) => index}
            data={filteredDataSource}
            renderItem={ItemView}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  searchbarContainer: {
    marginTop: 10,
  },
  searchbarInput: {
    borderColor: "#1323",
    borderWidth: 2,
    borderRadius: 20,
    marginTop: 0,
    padding: 7,
    textAlign: "center",
    backgroundColor: "white",
    shadowColor: "white",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 5,
    shadowRadius: 15,

    elevation: 7,
  },
  bookFilter: {
    marginTop: 5,
    borderColor: "#1323",
    borderWidth: 2,
    borderRadius: 20,
    marginBottom: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    shadowColor: "white",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 5,
    shadowRadius: 15,

    elevation: 7,
    
  },
  list: {
    width: "95%",
  },
  bookBox: {
    flex: 1,
    overflow: "hidden",
    marginTop: 10,
    paddingTop: 5,
    alignItems: "center",
    // borderColor: "#8d99ae",
    // borderWidth: 0.5,
  },
  image: {
    marginTop: 0,
    marginHorizontal: 0,
    marginBottom: 15,
    width: 150,
    height: 220,
    borderRadius: 5,
    borderColor: "#8d99ae",
    borderWidth: 0.5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 7,

    elevation: 10,
  },
  textBox: {
    backgroundColor: "#eaf4f4",
    marginBottom: 10,
    borderColor: "#8d99ae",
    borderWidth: 0.5,
    borderRadius: 5,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 150,
    height: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,

    elevation: 10,
  },
  bookText: {
    fontFamily: "HelveticaNeue",
    color: "#41444B",
    fontWeight: "900",
    margin: 5,
    padding: 3,
  },
});
