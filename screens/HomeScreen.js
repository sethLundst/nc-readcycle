import * as React from "react";
import { View, Text } from "react-native";
import BookList from "../components/BookList";

export default function HomeScreen({ navigation }) {
  return <BookList navigation={navigation} />;
}
