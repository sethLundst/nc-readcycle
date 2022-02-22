import * as React from "react";
import { View, Text } from "react-native";
import BarcodeScanner from "../components/BarcodeScanner";

export default function BarcodeScannerScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <BarcodeScanner />
    </View>
  );
}
