import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { MainStackNavigator } from "./navigation/StackNavigators";
import {UserProvider} from "./contexts/User"

function App() {

  return (
    <UserProvider>
    <NavigationContainer>
      <MainStackNavigator></MainStackNavigator>
    </NavigationContainer>
    </UserProvider>
  );
}
export default App;
