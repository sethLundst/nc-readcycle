import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
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
        <View style={styles.infoBox}>
          <Text style={styles.title}>{books[2].items[0].volumeInfo.title}</Text>
          <Text style={styles.bookInfo}>
            {books[2].items[0].volumeInfo.authors}
          </Text>
          <Text style={styles.bookInfo}>
            {books[2].items[0].volumeInfo.publishedDate}
          </Text>
          <Text style={styles.bookInfo}>
            {books[2].items[0].volumeInfo.pageCount} Pages
          </Text>
          <Text style={styles.bookInfo}>
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
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.offerButton}>
          <Text style={styles.buttonText}>Add to Offered Books</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addToWishListButton}>
          <Text style={styles.buttonText}>Add to Wishlist</Text>
        </TouchableOpacity>
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
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    },
    infoBox: {
      
  },
  image: {
    marginLeft: 160,
    marginRight: 20,
    top: 10,
    width: 180,
    height: 250,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  title: {
    marginTop: 25,
    width: "60%",
    fontFamily: "HelveticaNeue",
    color: "#52575D",
    fontWeight: "600",
    fontSize: 15,
    paddingBottom: 15,
  },
  bookInfo: {
    paddingBottom: 8,
  },
  description: {
    width: "100%",
    marginTop: -5,
    marginBottom: 0,
    fontFamily: "HelveticaNeue",
    color: "#52575D",
    marginLeft: -5,
  },
  descriptionHeader: {
    marginLeft: -5,
    fontSize: 30,
    fontWeight: "500",
    marginBottom: 15,
    fontFamily: "HelveticaNeue",
    color: "#52575D",
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    marginBottom: -220,
  },
  offerButton: {
    borderColor: "#52575D",
    borderWidth: 2,
    borderRadius: 12,
    padding: 10,
    width: 170,
    height: 40,
    marginLeft: -5,
    marginBottom: -40,
  },
  addToWishListButton: {
    borderColor: "#52575D",
    borderWidth: 2,
    borderRadius: 12,
    padding: 10,
    width: 170,
    height: 40,
  },
  buttonText: {
    textAlign: "center",
    fontFamily: "HelveticaNeue",
    color: "#52575D",
    fontWeight: "700",
  },
});
