import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Image,
  TouchableOpacity
} from "react-native";
import { Ionicons, Foundation, MaterialIcons } from "@expo/vector-icons";

const BooksHomedLink = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View>
      <Modal
        hasBackdrop={true}
        animationType={"fade"}
        transparent
        visible={modalVisible}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}> You have given 8 books a new home!</Text>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Pressable onPress={() => setModalVisible(true)}>
        <View>
        <Ionicons name="ios-bookmarks-outline" size={24} color="black" />
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    marginTop: 300,
    marginBottom:300,
  },
  modalBackground: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#41444B",
    borderRadius: 50,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#41444B",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    fontFamily: "HelveticaNeue",
    color: "#52575D",
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "200",
    fontSize: 36,
  },
});

export default BooksHomedLink;