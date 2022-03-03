import * as React from "react";
import { useEffect, useState } from "react";
import { Button, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { BarCodeScanner, requestPermissionsAsync } from "expo-barcode-scanner";
import { LinearGradient } from "expo-linear-gradient";
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
        <Text style={styles.messageText}>Need to request permission</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.messageText}>No permission</Text>
        <TouchableOpacity style={styles.allowCameraButton}
          title="Allow camera permission"
          onPress={() => {
            askForCameraPermission();
          }}><Text style={styles.buttonText}>Allow camera permission</Text></TouchableOpacity>
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
      <LinearGradient
        // Background Linear Gradient
        colors={["#f7edf2","#dee2ff",  "white"]}
        start={{
          x: 0,
          y: 0,
        }}
        end={{
          x: 1,
          y: 1,
        }}
        style={styles.background}
      />
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{ height: "100%" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  scanner: {},
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "center",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "120%",
  },
  messageText: {
    alignSelf: "center",
    fontSize: 16,
    fontFamily: "HelveticaNeue",
    color: "black",
    padding: 10,
    borderRadius: 20,
    borderColor: "red",
    borderWidth: 2,
    marginTop: 140,
    shadowColor: "white",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 4,
    shadowRadius: 17,

    elevation: 10,
  },
  allowCameraButton: {
    height: 60,
    width: 300,
    alignSelf: "center",
    backgroundColor: "#ffbd03",
    borderRadius: 25,
    borderColor: "white",
    borderWidth: 2,
    justifyContent: "center",
    marginTop: 130,
    shadowColor: "green",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 4,
    shadowRadius: 17,

    elevation: 10,
  },
  buttonText: {
alignSelf: "center",
    fontSize: 20,
    fontFamily: "HelveticaNeue",
    color: "black",
    padding: 12,
  }
});
