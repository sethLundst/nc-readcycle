import React, { useContext, useEffect, useState } from "react";
import { Formik } from "formik";
import { getUserDetails, db, app, auth } from "../db/firestore";
import { UserContext } from "../contexts/User";
import { getDoc, getFirestore } from "firebase/firestore";
import {
  Button,
  TextInput,
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
} from "react-native";

export default function SingleMessageScreen({chatID}) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Single msg screen</Text>
    </View>
  );
}
