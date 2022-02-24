import React from "react";
import { Button, View } from "react-native";
import { BarCodeScanner, requestPermissionsAsync } from "expo-barcode-scanner";

const Scanner = () => {
  return (
    <View>
      <BarCodeScanner style={{ height: 400, width: 400 }} />
    </View>
  );
};

export default Scanner;
