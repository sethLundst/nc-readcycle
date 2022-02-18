import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import BarcodeScanner from "./components/BarcodeScanner";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>ReadCycle</Text>
      <StatusBar style="auto" />
      <BarcodeScanner></BarcodeScanner>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
