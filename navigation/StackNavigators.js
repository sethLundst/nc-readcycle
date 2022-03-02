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

const HomeStack = createNativeStackNavigator();
const ListBookStack = createNativeStackNavigator();
const LogInStack = createNativeStackNavigator();
const LogOutStack = createNativeStackNavigator();
const MessagesStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

export function HomeStackScreen() {
  return (
    <HomeStack.Navigator initialRouteName="HomeScreen">
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ title: "Home" }}
      />
      <HomeStack.Screen
        name="SingleBookScreen"
        component={SingleBookScreen}
        options={({ route }) => ({ title: route.params.name })}
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
    <LogInStack.Navigator initialRouteName="SignUpScreen">
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
        options={({ route }) => ({ title: route.params.name })}
      />
    </LogInStack.Navigator>
  );
}

export function ListBookStackScreen() {
  return (
    <ListBookStack.Navigator initialRouteName="ListBookScreen">
      <ListBookStack.Screen
        name="ListBookScreen"
        component={ListBookScreen}
        options={{ title: "Upload Book" }}
      />
      <ListBookStack.Screen
        name="ScannerScreen"
        component={ScannerScreen}
        options={{ headerBackTitle: "", title: "Scan Barcode" }}
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
    <MessagesStack.Navigator initialRouteName="MessagesScreen">
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
        options={{ title: currentUser.username }}
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
    <ProfileStack.Navigator initialRouteName="UserProfileScreen">
      <ProfileStack.Screen
        name="UserProfileScreen"
        component={UserProfileScreen}
        options={{ title: currentUser.username }}
      />
      <ProfileStack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{ title: "Edit Profile" }}
      />
      <ProfileStack.Screen
        name="SingleBookScreen"
        component={SingleBookScreen}
        options={({ route }) => ({ title: route.params.name })}
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
    <LogOutStack.Navigator initialRouteName="LogOutScreen">
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
    </LogOutStack.Navigator>
  );
}
