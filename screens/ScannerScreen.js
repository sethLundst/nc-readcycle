import * as React from "react";
import { Button, View, Text } from "react-native";
import Scanner from "../components/Scanner";

export default function ScannerScreen({ navigation, route }) {
  return <Scanner navigation={navigation} route={route} />;
}
