import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../contexts/User";
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Modal,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { getUserDetails } from "../db/firestore";

const EditProfileScreen = () => {
  //   bs = React.createRef();
  const [showModal, setShowModal] = useState(false);

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(null);
  const [transferred, setTransferred] = useState(0);
  const [userData, setUserData] = useState(null);
  const { user, setUser } = useContext(UserContext);

  console.log(showModal, "<< is modal shown?");

  console.log(user, "<< user details");

  useEffect(() => {
    const fetchUserDetails = async () => {
      const result = await getUserDetails(user);
      setUser(result);
    };
    fetchUserDetails();
  }, [user, getUserDetails]);

  return (
    <View style={styles.container}>
      <View style={{ margin: 20 }}>
        <View style={{ alignItems: "center" }}>
          {/* <EditProfilePic /> */}
          {/* <TouchableOpacity onPress={() => EditProfilePic}> */}
          <View
            style={{
              height: 100,
              width: 100,
              borderRadius: 15,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* <Modal
               hasBackdrop={true}
               animationType={"fade"}
               transparent
            //    visible={showModal}
               > */}
            <View>
              <View>
                <View>
                  <ImageBackground
                    source={require("../assets/cat.png")}
                    style={{ height: 100, width: 100 }}
                    imageStyle={{ borderRadius: 15 }}
                  >
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Icon
                        name="camera"
                        size={35}
                        color="#FFF"
                        style={{
                          opacity: 0.4,
                          justifyContent: "center",
                          alignItems: "center",
                          borderWidth: 1,
                          borderColor: "#FFF",
                          borderRadius: 10,
                        }}
                      ></Icon>
                      <TouchableOpacity onPress={() => pickImage}>
                        <Icon
                          name="camera"
                          size={35}
                          color="#FFF"
                          style={{
                            opacity: 0.4,
                            justifyContent: "center",
                            alignItems: "center",
                            borderWidth: 1,
                            borderColor: "#FFF",
                            borderRadius: 10,
                          }}
                        ></Icon>
                      </TouchableOpacity>
                    </View>
                  </ImageBackground>
                </View>
              </View>
            </View>
            {/* </Modal> */}
          </View>
          {/* </TouchableOpacity> */}
          <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "bold" }}>
            Pussy Galore
          </Text>
        </View>
        <View style={styles.action}>
          <FontAwesome name="user-o" size={20} />
          <TextInput
            placeholder="First Name"
            placeholderTextColour="#666666"
            autocorrect={false}
            style={styles.textInput}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="user-o" size={20} />
          <TextInput
            placeholder="Last Name"
            placeholderTextColour="#666666"
            autocorrect={false}
            style={styles.textInput}
          />
        </View>
        <View style={styles.action}>
          <Feather name="phone" size={20} />
          <TextInput
            placeholder="Phone"
            placeholderTextColour="#666666"
            keyboardType="number-pad"
            autocorrect={false}
            style={styles.textInput}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="envelope-o" size={20} />
          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            placeholderTextColour="#666666"
            autocorrect={false}
            style={styles.textInput}
          />
        </View>
        <View style={styles.action}>
          <Icon name="map-marker-outline" size={20} />
          <TextInput
            placeholder="City"
            placeholderTextColour="#666666"
            autocorrect={false}
            style={styles.textInput}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="globe" size={20} />
          <TextInput
            placeholder="Country"
            placeholderTextColour="#666666"
            autocorrect={false}
            style={styles.textInput}
          />
        </View>
        <TouchableOpacity
          style={styles.commandButton}
          onPress={() => {
            handleUpdate;
          }}
        >
          <Text style={styles.panelButtonTitle}>Update</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    //   borderBottomColor: '#333333',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    // marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#333333",
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "green",
    alignItems: "center",
    marginTop: 10,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  // modal
  modalContainer: {
    // flex: 1,
    justifyContent: "center",
    // marginTop: 250,
    // marginBottom: 250,
    // marginLeft: 50,
    // marginRight: 50,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
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
  modalText: {
    fontSize: 20,
    marginBottom: 10,
  },
  modalBackground: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalInfo: {
    alignItems: "center",
  },
});

export default EditProfileScreen;
