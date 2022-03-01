import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import EditProfileScreen from "../screens/EditProfileScreen";
import ListBookScreen from "../screens/ListBookScreen";
import HomeScreen from "../screens/HomeScreen";
import LogInScreen from "../screens/LogInScreen";
import LogOutScreen from "../screens/LogOutScreen";
import MessagesScreen from "../screens/MessagesScreen";
import ScannerScreen from "../screens/ScannerScreen";
import SearchScreen from "../screens/SearchScreen";
import SignUpScreen from "../screens/SignUpScreen";
import SingleBookScreen from "../screens/SingleBookScreen";
import UserProfileScreen from "../screens/UserProfileScreen";

const HomeStack = createNativeStackNavigator();
const ListBookStack = createNativeStackNavigator();
const LogInStack = createNativeStackNavigator();
const LogOutStack = createNativeStackNavigator();
const MessagesStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const SearchStack = createNativeStackNavigator();

export function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{ headerShown: false }}
    >
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen name="SingleBookScreen" component={SingleBookScreen} />
    </HomeStack.Navigator>
  );
}

export function LogInStackScreen() {
  return (
    <LogInStack.Navigator
      initialRouteName="SignUpScreen"
      screenOptions={{ headerShown: false }}
    >
      <LogInStack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
      <LogInStack.Screen name="LogInScreen" component={LogInScreen} />
      <LogInStack.Screen name="HomeScreen" component={HomeScreen} />
      <LogInStack.Screen name="SingleBookScreen" component={SingleBookScreen} />
    </LogInStack.Navigator>
  );
}

export function ListBookStackScreen() {
  return (
    <ListBookStack.Navigator
      initialRouteName="ListBookScreen"
      screenOptions={{ headerShown: false }}
    >
      <ListBookStack.Screen name="ListBookScreen" component={ListBookScreen} />
      <ListBookStack.Screen name="ScannerScreen" component={ScannerScreen} />
    </ListBookStack.Navigator>
  );
}

export function MessagesStackScreen() {
  return (
    <MessagesStack.Navigator
      initialRouteName="MessagesScreen"
      screenOptions={{ headerShown: false }}
    >
      <MessagesStack.Screen name="MessagesScreen" component={MessagesScreen} />
      <MessagesStack.Screen
        name="SingleBookScreen"
        component={SingleBookScreen}
      />
      <MessagesStack.Screen
        name="UserProfileScreen"
        component={UserProfileScreen}
      />
    </MessagesStack.Navigator>
  );
}

export function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator
      initialRouteName="UserProfileScreen"
      screenOptions={{ headerShown: false }}
    >
      <ProfileStack.Screen
        name="UserProfileScreen"
        component={UserProfileScreen}
      />
      <ProfileStack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
      />
      <ProfileStack.Screen
        name="SingleBookScreen"
        component={SingleBookScreen}
      />
    </ProfileStack.Navigator>
  );
}

export function LogOutStackScreen() {
  return (
    <LogOutStack.Navigator
      initialRouteName="LogOutScreen"
      screenOptions={{ headerShown: false }}
    >
      <LogOutStack.Screen name="LogOutScreen" component={LogOutScreen} />
      <LogInStack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
    </LogOutStack.Navigator>
  );
}
