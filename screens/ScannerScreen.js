import * as React from "react";
import { Button, View, Text } from "react-native";
import Scanner from "../components/Scanner";

export default function ScannerScreen({ navigation, route }) {
  const setVariable = route.params;

  console.log(typeof setVariable);

  return <Scanner />;
}
