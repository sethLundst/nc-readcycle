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
} from "react-native";
import { BarCodeScanner, requestPermissionsAsync } from "expo-barcode-scanner";
import { api } from "../api";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ISBN, setISBN] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState();
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [pageCount, setPageCount] = useState();

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };

  useEffect(() => {
    askForCameraPermission();
  }, []);

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

  const submitPress = () => {
    setSubmitted(true);
    const bookObject = { title, author, pageCount, ISBN, category };
    console.log(bookObject);
    // }
  };

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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 400, width: 400 }}
        />

        <Image source={{ uri: image }} style={styles.image} />
        {scanned && (
          <Button title={"Scan again"} onPress={() => resetScanner()} />
        )}
        <View
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
        </View>
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
