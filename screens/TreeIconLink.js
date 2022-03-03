import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons, Foundation, MaterialIcons } from "@expo/vector-icons";

function getTreeCount(user) {
  let total = 0;
  for (let i = 0; i < user.books.length; i++) {
    total += user.books[i].pageCount / 8000;
  }
  return total.toFixed(2);
}
const TreeIconLink = () => {
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
            <Image style={styles.tree} source={require("../assets/tree.png")} />
            <Text style={styles.modalText}>
              {getTreeCount(currentUser)} trees saved
            </Text>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Tree count</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Pressable onPress={() => setModalVisible(true)}>
        <View>
          <Foundation name="trees" size={20} color="black" />
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
    padding: 10,
    marginTop: 300,
    marginBottom: 300,
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
  tree: {
    height: 50,
    width: 50,
    padding: 10,
  },
});

export default TreeIconLink;
