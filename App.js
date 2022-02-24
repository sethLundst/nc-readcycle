import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import BarcodeScanner from "./components/BarcodeScanner";
import BookList from "./components/BookList";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "./navigation/TabNavigator";
import * as geolib from 'geolib';
// const geolib = require('geolib');

function App() {
  
  return (
    <View style={styles.container}>
      {/* <Text>ReadCycle</Text> */}
      <StatusBar style="auto" />
      {/* <BarcodeScanner></BarcodeScanner> */}
      <BookList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",

    // alignItems: "center",
    // justifyContent: "center",
  },
});

<NavigationContainer>
  <BottomTabNavigator></BottomTabNavigator>
</NavigationContainer>;

export default App;
