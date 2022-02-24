import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import books from "./Books";

export default function SingleBookPage() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backButtonContainer}>
      <Ionicons
              name="ios-arrow-back"
              size={24}
              color="#52575D"
            ></Ionicons>
      </View>
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
        <ScrollView style={styles.descriptionBox}>
        <Text style={styles.description}>
          {books[2].items[0].volumeInfo.description}
        </Text>
        </ScrollView>
        
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
    width: "95%",
  },
  backButtonContainer: {
marginTop: 10,
  },
  bookBox: {
    flex: 1,
    flexBasis: 180,
    flexDirection: "row",
    marginBottom: 40
    },
    infoBox: {
      flexBasis: 300,
  },
  image: {
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
    fontWeight: "700",
    fontSize: 15,
    paddingBottom: 15,
  },
  bookInfo: {
    paddingBottom: 8,
    fontFamily: "HelveticaNeue",
    color: "#52575D",
    fontWeight: "600",
  },
  descriptionBox: {
    height: 200,
    marginTop: 10,
    marginBottom: 10,
    borderColor: "#DFD8C8",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5
  },
  description: {
    width: "100%",
    marginTop: 0,
    marginBottom: 5,
    fontFamily: "HelveticaNeue",
    color: "#52575D",
  },
  descriptionHeader: {
    fontSize: 30,
    fontWeight: "500",
    marginTop: 15,
    marginBottom: 10,
    fontFamily: "HelveticaNeue",
    color: "#52575D",
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 20
    
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
