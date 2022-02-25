import * as React from "react";
import { View, Text } from "react-native";
import ListBookForm from "../components/ListBookForm";

export default function ListBookScreen({ navigation, route }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ListBookForm navigation={navigation} route={route} />
    </View>
  );
}
