import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

import {
  HomeStackScreen,
  ListBookStackScreen,
  MessagesStackScreen,
  ProfileStackScreen,
  SearchStackScreen,
} from "../navigation/StackNavigators";

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="HomeStackScreen"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "HomeStackScreen") {
            iconName = "home-outline";
          } else if (route.name === "ListBookStackScreen") {
            iconName = "book-outline";
          } else if (route.name === "SearchStackScreen") {
            iconName = "search-outline";
          } else if (route.name === "MessagesStackScreen") {
            iconName = "chatbubbles-outline";
          } else if (route.name === "ProfileStackScreen") {
            iconName = "person-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "green",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="HomeStackScreen"
        component={HomeStackScreen}
        options={{ title: "Home" }}
      />
      <Tab.Screen
        name="ListBookStackScreen"
        component={ListBookStackScreen}
        options={{ title: "List Book" }}
      />
      <Tab.Screen
        name="SearchStackScreen"
        component={SearchStackScreen}
        options={{ title: "Search" }}
      />
      <Tab.Screen
        name="MessagesStackScreen"
        component={MessagesStackScreen}
        options={{ title: "Messages" }}
      />
      <Tab.Screen
        name="ProfileStackScreen"
        component={ProfileStackScreen}
        options={{ title: "Profile" }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
