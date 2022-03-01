import React, { useCallback, useState, useEffect, useContext } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { api } from "../api";
import { Formik } from "formik";
import * as yup from "yup";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { getUserDetails, sendBook } from "../db/firestore";
import { UserContext } from "../contexts/User";


export default function ListBookForm({ navigation, route }) {
  // State

  const { user, setUser } = useContext(UserContext);
  const [ISBN, setISBN] = useState("");
  const [addBookButton, setAddBookButton] = useState(false);
  const [description, setDescription] = useState("");
  const [id, setId] = useState("");
  const [highResImageLink, setHighResImageLink] = useState("");
  const [altImageLink, setAltImageLink] = useState("");
  const [pageCount, setPageCount] = useState("");
  const [language, setLanguage] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [searchISBN, setSearchISBN] = useState("");
  const [coordinates, setCoordinates] = useState()

  useEffect(async () => {
    if (route.params?.ISBN) {
      setISBN(route.params?.ISBN);
      APIcall(route.params?.ISBN);
    }
    const {coordinates} = await getUserDetails(user);
    setCoordinates(coordinates)
  }, [route.params?.ISBN]);

  // API call after barcode is scanned
  const APIcall = (searchISBN) => {
    api
      .get(
        `/books/v1/volumes?q=isbn:${searchISBN}&key=AIzaSyAVVkhe8oG7Y5vOVfzbb4tiSNuq5r0mbhQ`
      )
      .then((response) => {
        setISBN(
          response.data.items[0].volumeInfo.industryIdentifiers.filter(
            (object) => {
              return object.type === "ISBN_13";
            }
          )[0].identifier
        );
        setTitle(response.data.items[0].volumeInfo.title);
        setId(response.data.items[0].id);
        setHighResImageLink(
          `https://books.google.com/books/publisher/content/images/frontcover/${response.data.items[0].id}?fife=w400-h600&source=gbs_api`
        );
        setAltImageLink(response.data.items[0].volumeInfo.imageLinks.thumbnail);
        setAuthor(response.data.items[0].volumeInfo.authors[0]);
        setCategory(response.data.items[0].volumeInfo.categories[0]);
        setDescription(response.data.items[0].volumeInfo.description);
        setPageCount(response.data.items[0].volumeInfo.pageCount);
        setLanguage(response.data.items[0].volumeInfo.language);
        setPublishedDate(response.data.items[0].volumeInfo.publishedDate);
        setAddBookButton(true);
      });
  };

  // Take object from form
  const afterSubmit = (ISBN) => {
    const bookObj = {
      title: title,
      id: id,
      highResImage: highResImageLink,
      altImage: altImageLink,
      author: author,
      category: category,
      description: description,
      pageCount: pageCount,
      language: language,
      publishedDate: publishedDate,
      uid: user,
      ISBN: ISBN,
      coordinates: coordinates,
    };
    console.log(bookObj);
    sendBook(bookObj, user);
    resetState();
  };

  const resetState = () => {
    setTitle("");
    setHighResImageLink("");
    setAltImageLink("");
    setAuthor("");
    setCategory("");
    setDescription("");
    setPageCount("");
    setLanguage("");
    setPublishedDate("");
    setISBN("");
    setSearchISBN("");
    setAddBookButton(false);
  };

  // Validation schema
  // const bookSchema = yup.object({
  //   title: yup.string().required().min(2),
  //   author: yup.string().required().min(5),
  //   category: yup.string().required().min(2),
  //   ISBN: yup.string().required().min(10),
  // });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Barcode Button */}
        <TouchableOpacity
          style={styles.barcodeButton}
          onPress={() => navigation.navigate("ScannerScreen")}
        >
          <Text style={styles.barcodeText}>Scan a barcode</Text>
          <MaterialCommunityIcons
            style={{ margin: 0, padding: 0 }}
            name="barcode"
            size={24}
            color="black"
          />
        </TouchableOpacity>

        {/* Text */}
        <Text style={{ textAlign: "center" }}>or Search by ISBN:</Text>

        {/* ISBN Search Box */}
        <View style={{ flex: 1, flexDirection: "row" }}>
          <TextInput
            style={styles.textbox}
            value={searchISBN}
            onChangeText={(value) => setSearchISBN(value)}
            placeholder="e.g. 9780198829195"
          />
          <TouchableOpacity onPress={() => APIcall(searchISBN)}>
            <AntDesign name="search1" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* Book picture box  */}
        <View style={styles.imageBox}>
          <Image
            style={styles.image}
            source={{
              uri: highResImageLink,
            }}
          />
          <Text style={styles.bookTitle}>{title}</Text>
        </View>

        {/* Submit Button */}
        {addBookButton && (
          <Button onPress={() => afterSubmit(ISBN)} title="Submit" />
        )}
        {addBookButton && <Button onPress={() => resetState()} title="Clear" />}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "95%",
    flex: 1,
    backgroundColor: "#d3d3d3",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    height: 250,
    aspectRatio: 0.75,
  },
  imageBox: {
    flex: 1,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
    borderStyle: "dashed",
    borderRadius: 1,
  },

  textbox: {
    alignSelf: "center",
    flex: 1,
    width: 200,
    height: 40,
    borderWidth: 1,
    margin: 10,
  },

  barcodeButton: {
    flex: 1,
    flexDirection: "row",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ddd",
    borderRadius: 5,
    borderWidth: 1,
  },

  bookTitle: {
    color: "red",
    fontWeight: "200",
  },
});
