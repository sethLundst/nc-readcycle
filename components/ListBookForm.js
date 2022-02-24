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
import { BarCodeScanner, requestPermissionsAsync } from "expo-barcode-scanner";
import { api } from "../api";
import { Formik } from "formik";
import * as yup from "yup";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Scanner from "./Scanner";

export default function ListBookForm({ navigation }) {
  // State
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ISBN, setISBN] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState();
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [pageCount, setPageCount] = useState();
  const [openScanner, setOpenScanner] = useState(false);
  const [variable, setVariable] = useState("0");

  // Request camera permission
  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };

  // Initially renders camera permission box on load
  useEffect(() => {
    askForCameraPermission();
  }, []);

  // API call after barcode is scanned
  const handleBarCodeScanned = ({ type, data }) => {
    console.log(data);
    console.log(type);
    setScanned(true);
    setISBN(data);
    api
      .get(
        `/books/v1/volumes?q=isbn:${data}&key=AIzaSyAVVkhe8oG7Y5vOVfzbb4tiSNuq5r0mbhQ`
      )
      .then((response) => {
        setTitle(response.data.items[0].volumeInfo.title);
        setImage(response.data.items[0].volumeInfo.imageLinks.thumbnail);
        setAuthor(response.data.items[0].volumeInfo.authors[0]);
        setCategory(response.data.items[0].volumeInfo.categories[0]);
        setPageCount(String(response.data.items[0].volumeInfo.pageCount));
      });
  };

  // Controlled components - resets all state if "scan again" pressed
  const resetScanner = () => {
    setScanned(false);
    setISBN("");
    setTitle("");
    setImage();
    setAuthor("");
    setCategory("");
    setPageCount();
    setSubmitted(false);
  };

  // Creates bookObject after submit is pressed
  const submitPress = () => {
    setSubmitted(true);
    const bookObject = { title, author, pageCount, ISBN, category };
    console.log(bookObject);
    // }
  };

  // Renders button to ask for camera permission
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Need to request permission</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>No permission</Text>
        <Button
          title="Allow camera permission"
          onPress={() => {
            askForCameraPermission();
          }}
        />
      </View>
    );
  }

  // Take object from form
  const afterSubmit = (values) => {
    console.log(values);
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
          onPress={() =>
            navigation.navigate("ScannerScreen", { setVariable: setVariable })
          }
        >
          <Text>
            Open new scanner{" "}
            <MaterialCommunityIcons name="barcode" size={24} color="black" />
          </Text>
        </TouchableOpacity>

        {openScanner && (
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{ height: 400, width: 400 }}
          />
        )}

        {/* <Image source={{ uri: image }} style={styles.image} /> */}
        {/* Render scan again button after barcode scanned */}
        {scanned && (
          <Button title={"Scan again"} onPress={() => resetScanner()} />
        )}

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

              <Text>ISBN:</Text>
              <TextInput
                style={styles.textbox}
                onChangeText={handleChange("ISBN")}
                onBlur={handleBlur("ISBN")}
                value={values.ISBN}
                placeholder="e.g. 9780198829195"
              />
              <Text>{touched.ISBN && errors.ISBN}</Text>

              <Button onPress={handleSubmit} title="Submit" />
            </View>
          )}
        </Formik>

        {/* <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <TextInput
            style={styles.textbox}
            value={title}
            placeholder="Title Here"
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.textbox}
            value={author}
            placeholder="Author Here"
            onChangeText={setAuthor}
          />
          <TextInput
            style={styles.textbox}
            value={category}
            placeholder="Category Here"
            onChangeText={setCategory}
          />
          <TextInput
            style={styles.textbox}
            value={ISBN}
            placeholder="ISBN Here"
            onChangeText={setISBN}
          />
          <TextInput
            style={styles.textbox}
            value={pageCount}
            placeholder="Page Count Here"
            onChangeText={setPageCount}
          />
          {submitted && <Text style={{ color: "green" }}>Submitted</Text>}
          <Button title="Submit" onPress={submitPress} />
        </View> */}
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
