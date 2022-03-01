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
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  map: {
    height: 350,
    width: 350,
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
