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
  Platform,
} from "react-native";
import { getDistance, convertDistance } from "geolib";
import { getAllUsers, getUserDetails } from "../db/firestore";
import styled from "styled-components/native";
import Slider from "@react-native-community/slider";

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
    alignItems: "center",
  },
  title: {
    width: 130,
    textAlign: "center",
    paddingTop: 30,
  },
  bookBox: {
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 0,
  },
  searchbarInput: {
    borderColor: "#1323",
    borderWidth: 2,
    borderRadius: 20,
    marginTop: 180,
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
          <Image
            style={styles.image}
            source={{
              uri: item.highResImage,
            }}
            style={styles.image}
          />
        </TouchableOpacity>
        <Text style={styles.title}>{item.title}</Text>
        <Text>{item.distance} miles away.</Text>
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
        <Text style={{ fontSize: 18 }}> up to {distance.toFixed(2)} miles</Text>
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
          <Text>Sorry we could find no books, please expand your radius.</Text>
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
  );
}
