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
  SafeAreaView,
  Platform,
} from "react-native";
import { getDistance, convertDistance } from "geolib";
import { getAllUsers, getUserDetails } from "../db/firestore";
import styled from "styled-components/native";
import Slider from "@react-native-community/slider";
import { LinearGradient } from "expo-linear-gradient";

// slider styles
const SliderWrapper = styled.View`
  margin: 15px;
  width: 180px;
  height: 30px;
  justify-content: center;
`;

const ViewContainer = styled.View`
  align-self: center;
  justify-content: center;
  margin: 10px;
`;
const LabelWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 0px;
  margin: 0px;
`;

const LabelText = styled.Text`
  font-size: 15px;
`;

export default function HomeScreen({ navigation }) {
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [allBooks, setAllBooks] = useState();
  const [currentUser, setCurrentUser] = useState();
  const { user, setUser } = useContext(UserContext);
  const [multiSliderValue, setMultiSliderValue] = useState([0, 20]);
  const [distance, setDistance] = useState(100);

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = filteredDataSource.filter((book) => {
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
          <View style={styles.imagebox}>
            <Image
              style={styles.image}
              source={{
                uri: item.highResImage,
              }}
              style={styles.image}
            />
          </View>
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
      setFilteredDataSource(sortedBooks);
    };
    fetchCurrentUser(user);
    fetchAllBooks(user);
  }, [user, getAllUsers, getUserDetails]);

  function handleChange(distance) {
    setDistance(distance);
    const array = allBooks.filter((book) => distance > book.distance);
    setFilteredDataSource(array);
  }

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
          <Text style={{ fontSize: 18 }}>
            up to {Math.round(distance)} miles
          </Text>
          <Slider
            style={{ width: 200, height: 40 }}
            value={distance}
            onValueChange={(distance) => handleChange(distance)}
            minimumValue={0}
            maximumValue={100}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
          />
        </View>
        <View style={styles.bookFilter}>
          <Text>112 trees saved</Text>
          {/* <Text>Showing {filteredDataSource.length} books...</Text> */}
          <View style={styles.sliderContainer}></View>
        </View>
        <View></View>
        <View style={styles.list}>
          {!filteredDataSource.length ? (
            <Text>
              Sorry we could find no books, please expand your radius.
            </Text>
          ) : (
            <FlatList
              numColumns={2}
              keyExtractor={(_item, index) => index}
              data={filteredDataSource}
              renderItem={ItemView}
            />
          )}
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
    shadowColor: "pink",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 5,
    shadowRadius: 15,

    elevation: 7,
  },
  list: {
    width: "100%",
    marginBottom: 170,
  },
  bookBox: {
    flex: 1,
    overflow: "hidden",
    marginTop: 10,
    paddingTop: 0,
    paddingRight:10,
    alignItems: "center",
    justifyContent: "center",
    // borderColor: "#8d99ae",
    // borderWidth: 0.5,
  },
  imagebox: {
    backgroundColor: "white",
    width: 162,
    height: 232,
    borderRadius: 15,
    borderColor: "white",
    borderWidth: 6,
    shadowColor: "pink",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 17,

    elevation: 10,
  },
  image: {
    marginTop: 0,
    marginHorizontal: 0,
    marginBottom: 3,
    width: 150,
    height: 220,
    borderRadius: 5,
    
   
  },
  textBox: {
    backgroundColor: "#caf0f8",
    marginLeft: 11,
    marginTop: 12,
    marginBottom: 10,
    borderColor: "white",
    borderWidth: 6,
    borderRadius: 15,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 162,
    height: 100,
    shadowColor: "pink",
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
