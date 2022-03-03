import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

import {
  HomeStackScreen,
  ListBookStackScreen,
  MessagesStackScreen,
  ProfileStackScreen,
  SearchStackScreen,
  LogOutStackScreen,
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
            iconName = "barcode-outline";
          } else if (route.name === "MessagesStackScreen") {
            iconName = "chatbubbles-outline";
          } else if (route.name === "ProfileStackScreen") {
            iconName = "person-outline";
          } else if (route.name === "LogOutStackScreen") {
            iconName = "log-out-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "green",
        tabBarInactiveTintColor: "gray",
        tabBarLabel: "",
        headerShown: false,
      })
      }
    >
      <Tab.Screen
        name="HomeStackScreen"
        component={HomeStackScreen}
        options={{ showLabel: false}}
       
      />
      <Tab.Screen
        name="ListBookStackScreen"
        component={ListBookStackScreen}
        options={{ showLabel: false }}
      />
      <Tab.Screen
        name="MessagesStackScreen"
        component={MessagesStackScreen}
        options={{ showLabel: false }}
      />
      <Tab.Screen
        name="ProfileStackScreen"
        component={ProfileStackScreen}
        options={{ showLabel: false }}
      />
      <Tab.Screen
        name="LogOutStackScreen"
        component={LogOutStackScreen}
        options={{ showLabel: false, tabBarVisible: false }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
