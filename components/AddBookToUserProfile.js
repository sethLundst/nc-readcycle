import { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { api } from "../api";

export default function AddBookToUserProfile() {
  const ISBN = 9780191623042;
  const [book, setBook] = useState([]);
  const [cover, setCover] = useState();

  const getBook = useCallback(
    async function getBook() {
      try {
        const response = await api.get(
          `/books/v1/volumes?q=isbn:${ISBN}&key=AIzaSyAVVkhe8oG7Y5vOVfzbb4tiSNuq5r0mbhQ`
        );
        setBook(response.data.items[0].volumeInfo);
        setCover(response.data.items[0].volumeInfo.imageLinks.thumbnail);
      } catch (err) {}
    },
    [ISBN]
  );

  useEffect(() => {
    getBook();
  }, [getBook]);

  return (
    <View style={styles.container}>
      <Text>{book.title}</Text>
      <Image
        source={{
          uri: cover,
        }}
        style={styles.image}
      />
    </View>
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
});
