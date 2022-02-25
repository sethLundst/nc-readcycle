import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "./navigation/TabNavigator";
import { MainStackNavigator } from "./navigation/StackNavigators";

function App() {
  return (
    <NavigationContainer>
      <MainStackNavigator></MainStackNavigator>
    </NavigationContainer>
  );
}
export default App;
