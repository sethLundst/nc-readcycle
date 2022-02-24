import React, { useCallback, useState, useEffect } from "react";
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

export default function ListBookForm({ navigation, route }) {
  // State

  const [ISBN, setISBN] = useState("");
  const [addBookButton, setAddBookButton] = useState(false);

  useEffect(() => {
    if (route.params?.ISBN) {
      setISBN(route.params?.ISBN);
      setAddBookButton(true);
    }
  }, [route.params?.ISBN]);

  // API call after barcode is scanned
  const APIcall = (value, setFieldValue) => {
    api
      .get(
        `/books/v1/volumes?q=isbn:${value}&key=AIzaSyAVVkhe8oG7Y5vOVfzbb4tiSNuq5r0mbhQ`
      )
      .then((response) => {
        console.log(response.data.items[0].volumeInfo);
        setFieldValue("ISBN", value);
        setFieldValue("title", response.data.items[0].volumeInfo.title);
        setFieldValue("author", response.data.items[0].volumeInfo.authors[0]);
        setFieldValue(
          "category",
          response.data.items[0].volumeInfo.categories[0]
        );
      });
  };

  // Take object from form
  const afterSubmit = (values) => {
    console.log(values);
    setISBN("");
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
            Open new scanner{" "}
            <MaterialCommunityIcons name="barcode" size={24} color="black" />
          </Text>
        </TouchableOpacity>
        {addBookButton && <Text>{ISBN}</Text>}

        <Formik
          initialValues={{
            title: "",
            author: "",
            category: "",
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
              {addBookButton && (
                <Button
                  title="Add book"
                  onPress={() => APIcall(ISBN, setFieldValue)}
                />
              )}

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
              <Text>{touched.category && errors.category}</Text>

              <Button onPress={handleSubmit} title="Submit" />
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
    aspectRatio: 0.3,
    resizeMode: "contain",
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
