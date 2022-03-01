import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Image,
} from "react-native";
import { Ionicons, Foundation, MaterialIcons } from "@expo/vector-icons";

const MapButton = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View >
      <Modal
         hasBackdrop={true}
         animationType={"fade"}
         transparent
         visible={modalVisible}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Image
              style={styles.map}
              source={require("../assets/map.png")}
            ></Image>
            <Text style={styles.modalText}>Hello! I'm based in Sheffield</Text>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Map</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        
        onPress={() => setModalVisible(true)}
      >
        <View style={styles.location}>
            <Ionicons
              name="ios-location-outline"
              size={26}
              color="black"
              style={{ marginTop: 0, marginLeft: 1 }}
            ></Ionicons>
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
    marginTop: 200,
    marginBottom: 200,
    marginLeft: 20,
    marginRight: 20,
  },
  modalBackground: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    height: 250,
    width: 250,
    borderColor: "black",
    borderRadius: 12,
    borderWidth: 1
  },
  button: {
    backgroundColor: "#41444B",
    borderRadius: 50,
    padding: 10,
    elevation: 2
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
    fontSize: 36
  },
  // location: {
  //   backgroundColor: "#41444B",
  //   width: 30,
  //   height: 30,
  //   borderRadius: 30,
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
});

export default MapButton;
