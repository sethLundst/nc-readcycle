import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BarcodeScannerScreen from "../screens/BarcodeScannerScreen";
import ListBookManuallyScreen from "../screens/ListBookManuallyScreen";
import ListBookScreen from "../screens/ListBookScreen";

const Stack = createNativeStackNavigator();

function ListBookStackScreen() {
  return (
    <Stack.Navigator
      initialRouteName="ListBookScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="ListBookScreen" component={ListBookScreen} />
      <Stack.Screen
        name="BarcodeScannerScreen"
        component={BarcodeScannerScreen}
      />
      <Stack.Screen
        name="ListBookManuallyScreen"
        component={ListBookManuallyScreen}
      />
    </Stack.Navigator>
  );
}

export default ListBookStackScreen;
