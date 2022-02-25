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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { sendBook } from "../db/firestore";
import { UserContext } from "../contexts/User";

export default function ListBookForm({ navigation, route }) {
  // State

  const { user, setUser } = useContext(UserContext);
  const [ISBN, setISBN] = useState("");
  const [addBookButton, setAddBookButton] = useState(false);
  const [description, setDescription] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [pageCount, setPageCount] = useState("");
  const [language, setLanguage] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (route.params?.ISBN) {
      setISBN(route.params?.ISBN);
      setAddBookButton(true);
      APIcall(route.params?.ISBN);
    }
  }, [route.params?.ISBN]);

  // API call after barcode is scanned
  const APIcall = (value, setFieldValue) => {
    api
      .get(
        `/books/v1/volumes?q=isbn:${value}&key=AIzaSyAVVkhe8oG7Y5vOVfzbb4tiSNuq5r0mbhQ`
      )
      .then((response) => {
        setTitle(response.data.items[0].volumeInfo.title);
        setImageLink(response.data.items[0].volumeInfo.imageLinks.thumbnail);
        setAuthor(response.data.items[0].volumeInfo.authors[0]);
        setCategory(response.data.items[0].volumeInfo.categories[0]);
        setDescription(response.data.items[0].volumeInfo.description);
        setPageCount(response.data.items[0].volumeInfo.pageCount);
        setLanguage(response.data.items[0].volumeInfo.language);
        setPublishedDate(response.data.items[0].volumeInfo.publishedDate);
      });
  };

  // Take object from form
  const afterSubmit = (formIsbn) => {
    const bookObj = {
      title: title,
      image: imageLink,
      author: author,
      category: category,
      description: description,
      pageCount: pageCount,
      language: language,
      publishedDate: publishedDate,
    };

    if (!formIsbn) {
      bookObj.ISBN = ISBN;
    } else {
      bookObj.ISBN = formIsbn;
    }

    console.log(bookObj);
    // values.description = description;
    // values.pageCount = pageCount;
    // values.language = language;
    // values.publishedDate = publishedDate;

    // sendBook(values, user);
    setTitle("");
    setImageLink("");
    setAuthor("");
    setCategory("");
    setDescription("");
    setPageCount("");
    setLanguage("");
    setPublishedDate("");
    setISBN("");
    setAddBookButton(false);
  };

  // Validation schema
  const bookSchema = yup.object({
    title: yup.string().required().min(2),
    author: yup.string().required().min(5),
    category: yup.string().required().min(2),
    ISBN: yup.string().required().min(10),
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <TouchableOpacity
          style={{
            flex: 1,
            height: 40,
            alignItems: "center",
            backgroundColor: "#ddd",
            borderRadius: 5,
            borderWidth: 1,
          }}
          onPress={() => navigation.navigate("ScannerScreen")}
        >
          <Text>
            Scan a barcode
            <MaterialCommunityIcons name="barcode" size={24} color="black" />
          </Text>
        </TouchableOpacity>
        {/* {addBookButton && <Text>{ISBN}</Text>} */}

        <View style={styles.imageBox}>
          <Text>{title}</Text>
          <Image
            style={styles.image}
            source={{
              uri: imageLink,
            }}
          />
        </View>

        {addBookButton && (
          <Button title={"Submit?"} onPress={() => afterSubmit()}></Button>
        )}

        <Text style={{ textAlign: "center" }}>OR</Text>

        <Formik
          initialValues={{
            ISBN: "",
          }}
          validationSchema={bookSchema}
          onSubmit={(values, actions) => {
            actions.resetForm();
            afterSubmit(values);
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            values,
            errors,
            touched,
          }) => (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* {addBookButton && (
                <Button
                  title="Add book"
                  onPress={() => APIcall(ISBN, setFieldValue)}
                />
              )} */}

              <Text>ISBN:</Text>
              <TextInput
                style={styles.textbox}
                onChangeText={handleChange("ISBN")}
                onBlur={handleBlur("ISBN")}
                value={values.ISBN}
                placeholder="e.g. 9780198829195"
              />
              <Button
                title="Search ISBN"
                onPress={() => APIcall(values.ISBN, setFieldValue)}
              />
              <Text>{touched.ISBN && errors.ISBN}</Text>

              <Button onPress={() => afterSubmit(values.ISBN)} title="Submit" />
              {/* 
              <Text>Title:</Text>
              <TextInput
                style={styles.textbox}
                onChangeText={handleChange("title")}
                onBlur={handleBlur("title")}
                value={values.title}
                placeholder="e.g. 1984"
              />
              <Text>{touched.title && errors.title}</Text>

              <Text>Author:</Text>
              <TextInput
                style={styles.textbox}
                onChangeText={handleChange("author")}
                onBlur={handleBlur("author")}
                value={values.author}
                placeholder="e.g. George Orwell"
              />
              <Text>{touched.author && errors.author}</Text>

              <Text>Category:</Text>
              <TextInput
                style={styles.textbox}
                onChangeText={handleChange("category")}
                onBlur={handleBlur("category")}
                value={values.category}
                placeholder="e.g. Fiction"
              />
              <Text>{touched.category && errors.category}</Text> */}
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    height: 250,
  },
  imageBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  textbox: {
    flex: 1,
    width: 200,
    height: 40,
    borderWidth: 1,
    margin: 10,
  },
});
<></>;
