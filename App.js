import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "./components/HomeScreen";
import ListBookScreen from "./components/ListBookScreen";
import SearchScreen from "./components/SearchScreen";
import UserProfileScreen from "./components/UserProfileScreen";

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ title: "Home" }}
        />
        <Tab.Screen
          name="ListBookScreen"
          component={ListBookScreen}
          options={{ title: "List Book" }}
        />
        <Tab.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={{ title: "Search" }}
        />
        <Tab.Screen
          name="UserProfileScreen"
          component={UserProfileScreen}
          options={{ title: "Profile" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
export default App;
