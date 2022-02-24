import * as React from "react";
import { View, Text } from "react-native";
import BookList from "../components/BookList";

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {/* <BookList /> */}
      <Text>List of available books</Text>
    </View>
  );
}
