import React from "react";
import { Button, View } from "react-native";
import { BarCodeScanner, requestPermissionsAsync } from "expo-barcode-scanner";

const Scanner = () => {
  const changeTrue = () => {
    setVariable("1");
  };

  return (
    <View>
      <Button> onPress={() => changeTrue}Press here</Button>
      <BarCodeScanner style={{ height: 400, width: 400 }} />
    </View>
  );
};

export default Scanner;
