// TODO: Back button, no header, no tabs.

import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const HomeStack = createNativeStackNavigator();
import HomeScreen from "../screens/HomeScreen";
import LogInScreen from "../screens/LogInScreen";
import SignUpScreen from "../screens/SignUpScreen";

const ListBookStack = createNativeStackNavigator();
import BarcodeScannerScreen from "../screens/BarcodeScannerScreen";
import ListBookManuallyScreen from "../screens/ListBookManuallyScreen";
import ListBookScreen from "../screens/ListBookScreen";

export function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      initialRouteName="SignUpScreen"
      screenOptions={{ headerShown: false }}
    >
      <HomeStack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen name="LogInScreen" component={LogInScreen} />
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
    </HomeStack.Navigator>
  );
}

export function ListBookStackScreen() {
  return (
    <ListBookStack.Navigator
      initialRouteName="ListBookScreen"
      screenOptions={{ headerShown: false }}
    >
      <ListBookStack.Screen name="ListBookScreen" component={ListBookScreen} />
      <ListBookStack.Screen
        name="BarcodeScannerScreen"
        component={BarcodeScannerScreen}
      />
      <ListBookStack.Screen
        name="ListBookManuallyScreen"
        component={ListBookManuallyScreen}
      />
    </ListBookStack.Navigator>
  );
}
