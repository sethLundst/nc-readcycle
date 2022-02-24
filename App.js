import * as React from "react";
import { UserProvider } from "./contexts/User";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "./navigation/TabNavigator";

function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <BottomTabNavigator></BottomTabNavigator>
      </NavigationContainer>
    </UserProvider>
  );
}
export default App;
