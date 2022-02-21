import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

import HomeScreen from "./components/HomeScreen";
import ListBookScreen from "./components/ListBookScreen";
import SearchScreen from "./components/SearchScreen";
import UserProfileScreen from "./components/UserProfileScreen";

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = focused
                ? "ios-information-circle"
                : "ios-information-circle-outline";
            } else if (route.name === "Settings") {
              iconName = focused ? "ios-list-box" : "ios-list";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "green",
          tabBarInactiveTintColor: "gray",
        })}
      >
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
