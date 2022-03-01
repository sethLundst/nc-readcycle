import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { MainStackNavigator } from "./navigation/StackNavigators";
import { UserProvider } from "./contexts/User";

import { useState, useEffect } from "react";
import { Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigator from "./navigation/TabNavigator";
import SignUpScreen from "./screens/SignUpScreen";
import LogInScreen from "./screens/LogInScreen";
import LoadingScreen from "./screens/LoadingScreen";

const MainStack = createNativeStackNavigator();

function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <MainStack.Navigator
          initialRouteName={"LoadingScreen"}
          screenOptions={{ headerShown: false }}
        >
          <MainStack.Screen name="SignUpScreen" component={SignUpScreen} />
          <MainStack.Screen name="LogInScreen" component={LogInScreen} />
          <MainStack.Screen
            name="BottomTabNavigator"
            component={BottomTabNavigator}
          />
          <MainStack.Screen name="LoadingScreen" component={LoadingScreen} />
        </MainStack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}

export default App;
