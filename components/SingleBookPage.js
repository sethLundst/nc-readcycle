import React from "react";
import { View, StyleSheet, Image, Text, Button, SafeAreaView } from "react-native";
import books from "./Books";

export default function SingleBookPage() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bookBox}>
        <Image
          style={styles.image}
          source={{
            uri: `${books[2].items[0].volumeInfo.imageLinks.thumbnail}`,
          }}
          style={styles.image}
        />
        <View>
          <Text style={styles.title}>{books[2].items[0].volumeInfo.title}</Text>
          <Text style={styles.title}>
            {books[2].items[0].volumeInfo.authors}
          </Text>
          <Text style={styles.title}>
            {books[2].items[0].volumeInfo.publishedDate}
          </Text>
          <Text style={styles.title}>
            {books[2].items[0].volumeInfo.pageCount} Pages
          </Text>
          <Text style={styles.title}>
            Language: {books[2].items[0].volumeInfo.language}
          </Text>
        </View>
      </View>
      <View>
        <Text style={styles.descriptionHeader}>Description</Text>
        <Text style={styles.description}>
          {books[2].items[0].volumeInfo.description}
        </Text>
          </View>
          <View style={styles.buttons}>
          <Button title="Offer this book"></Button>
          <Button title="Add to wishlist"></Button>
          </View>
          

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
  },
  bookBox: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  image: {
    marginLeft: 140,
    marginRight: 20,
    top: 10,
    width: 165,
    height: 220,
  },
  title: {
    marginTop: 10,
    width: "60%",
  },
  description: {
    width: "100%",
    marginBottom: 20,
  },
  descriptionHeader: {
    fontSize: 30,
    fontWeight: "500",
    marginBottom: 5,
    },
    buttons: {
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-between',
        margin: 25,
        width: "80%",
        alignContent: "center"
  }
});
