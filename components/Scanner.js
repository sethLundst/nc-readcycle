import React, { useEffect, useState } from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import { BarCodeScanner, requestPermissionsAsync } from "expo-barcode-scanner";

const Scanner = ({ navigation, route }) => {
  // STATE
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
    <View>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{ height: "90%" }}
      />
      <Button
        title="Mimic scan - For desktop/laptop testing"
        onPress={() => handleBarCodeScanned({ data: "9780003700862" })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    aspectRatio: 0.3,
    resizeMode: "contain",
  },
  textbox: {
    flex: 1,
    width: 200,
    height: 40,
    borderWidth: 1,
    margin: 10,
  },
});
<></>;

export default Scanner;
