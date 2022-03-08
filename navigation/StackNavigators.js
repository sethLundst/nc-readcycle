import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import EditProfileScreen from "../screens/EditProfileScreen";
import ListBookScreen from "../screens/ListBookScreen";
import HomeScreen from "../screens/HomeScreen";
import LogInScreen from "../screens/LogInScreen";
import LogOutScreen from "../screens/LogOutScreen";
import MessagesScreen from "../screens/MessagesScreen";
import ScannerScreen from "../screens/ScannerScreen";
import SignUpScreen from "../screens/SignUpScreen";
import SingleBookScreen from "../screens/SingleBookScreen";
import UserProfileScreen from "../screens/UserProfileScreen";
import SingleMessageScreen from "../screens/SingleMessageScreen";
import { UserContext } from "../contexts/User";
import { getUserDetails } from "../db/firestore";
import App from "../App";

const HomeStack = createNativeStackNavigator();
const ListBookStack = createNativeStackNavigator();
const LogInStack = createNativeStackNavigator();
const LogOutStack = createNativeStackNavigator();
const MessagesStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

export function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{ headerTransparent: true }}
    >
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        screenOptions={{ headerBackTitleVisible: false }}
        options={{ title: "" }}
      />
      <HomeStack.Screen
        name="SingleBookScreen"
        component={SingleBookScreen}
        options={{ title: "" }}
        screenOptions={{ headerBackTitleVisible: false }}
      />
      <MessagesStack.Screen
        name="SingleMessageScreen"
        component={SingleMessageScreen}
        options={({ route }) => ({ title: route.params.name })}
      />
    </HomeStack.Navigator>
  );
}

export function LogInStackScreen() {
  return (
    <LogInStack.Navigator
      initialRouteName="SignUpScreen"
      screenOptions={{ headerTransparent: true }}
    >
      <LogInStack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{ title: "Sign Up" }}
      />
      <LogInStack.Screen name="LogInScreen" component={LogInScreen} />
      <LogInStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ title: "Home" }}
      />
      <LogInStack.Screen
        name="SingleBookScreen"
        component={SingleBookScreen}
        options={{ title: "" }}
      />
    </LogInStack.Navigator>
  );
}

export function ListBookStackScreen() {
  return (
    <ListBookStack.Navigator
      initialRouteName="ListBookScreen"
      screenOptions={{ headerTransparent: true }}
    >
      <ListBookStack.Screen
        name="ListBookScreen"
        component={ListBookScreen}
        options={{ title: "Upload Book" }}
      />
      <ListBookStack.Screen
        name="ScannerScreen"
        component={ScannerScreen}
        options={{ title: "" }}
      />
    </ListBookStack.Navigator>
  );
}

export function MessagesStackScreen() {
  const { user } = useContext(UserContext);
  const [currentUser, setCurrentUser] = useState({ username: "" });

  useEffect(() => {
    const fetchCurrentUser = async (user) => {
      const result = await getUserDetails(user);
      setCurrentUser(result);
    };
    fetchCurrentUser(user);
  }, [user, getUserDetails]);

  return (
    <MessagesStack.Navigator
      initialRouteName="MessagesScreen"
      screenOptions={{ headerTransparent: true }}
    >
      <MessagesStack.Screen
        name="MessagesScreen"
        component={MessagesScreen}
        options={{ title: "Messages" }}
      />
      <MessagesStack.Screen
        name="SingleBookScreen"
        component={SingleBookScreen}
        options={({ route }) => ({ title: route.params.name })}
      />
      <MessagesStack.Screen
        name="UserProfileScreen"
        component={UserProfileScreen}
        options={{ title: "" }}
      />
      <MessagesStack.Screen
        name="SingleMessageScreen"
        component={SingleMessageScreen}
        options={({ route }) => ({ title: route.params.name })}
      />
    </MessagesStack.Navigator>
  );
}

export function ProfileStackScreen() {
  const { user } = useContext(UserContext);
  const [currentUser, setCurrentUser] = useState({ username: "" });

  useEffect(() => {
    const fetchCurrentUser = async (user) => {
      const result = await getUserDetails(user);
      setCurrentUser(result);
    };
    fetchCurrentUser(user);
  }, [user, getUserDetails]);

  return (
    <ProfileStack.Navigator
      initialRouteName="UserProfileScreen"
      screenOptions={{ headerTransparent: true }}
    >
      <ProfileStack.Screen
        name="UserProfileScreen"
        component={UserProfileScreen}
        options={{ title: "" }}
      />
      <ProfileStack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{ title: "Edit Profile" }}
      />
      <ProfileStack.Screen
        name="SingleBookScreen"
        component={SingleBookScreen}
        options={{ title: "" }}
      />
      <MessagesStack.Screen
        name="SingleMessageScreen"
        component={SingleMessageScreen}
        options={({ route }) => ({ title: route.params.name })}
      />
    </ProfileStack.Navigator>
  );
}

export function LogOutStackScreen() {
  return (
    <LogOutStack.Navigator
      initialRouteName="LogOutScreen"
      screenOptions={{ headerTransparent: true, headerShown: false }}
    >
      <LogOutStack.Screen
        name="LogOutScreen"
        component={LogOutScreen}
        options={{ title: "Log Out" }}
      />
      <LogInStack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{ title: "Sign Up" }}
      />
      <LogInStack.Screen name="App" component={App}></LogInStack.Screen>
    </LogOutStack.Navigator>
  );
}
