import * as React from "react";
import { Button, View } from "react-native";

export default function ListBookScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        title="Scan a barcode"
        onPress={() => navigation.navigate("BarcodeScannerScreen")}
      />
      <br></br>
      <Button
        title="List manually"
        onPress={() => navigation.navigate("ListBookManuallyScreen")}
      />
    </View>
  );
}
