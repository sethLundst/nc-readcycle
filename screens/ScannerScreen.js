import * as React from "react";
import { useEffect, useState } from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import { BarCodeScanner, requestPermissionsAsync } from "expo-barcode-scanner";

export default function ScannerScreen({ navigation, route }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  // CAMERA PERMISSION POP UP BOX
  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };

  // CAMERA PERMISSION POP UP BOX RENDERING
  useEffect(() => {
    askForCameraPermission();
  }, []);

  // CAMERA PERMISSION SCREENS
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Need to request permission</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>No permission</Text>
        <Button
          title="Allow camera permission"
          onPress={() => {
            askForCameraPermission();
          }}
        />
      </View>
    );
  }

  const handleBarCodeScanned = ({ type, data }) => {
    navigation.navigate({
      name: "ListBookScreen",
      params: {
        ISBN: data,
      },
      merge: true,
    });
  };

  // PAGE RENDER
  return (
    <View style={styles.scanner}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{ height: "100%" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  scanner: {},
});
