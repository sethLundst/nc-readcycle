import React, { useContext, useEffect, useState } from "react";
import { Formik } from "formik";
import { addMessage, getChat, getUserDetails } from "../db/firestore";
import { getDoc, getFirestore, Timestamp } from "firebase/firestore";
import { UserContext } from "../contexts/User";
import { SafeAreaView } from "react-native-safe-area-context";
const timestamp = require('time-stamp');
import {
	Button,
	TextInput,
	View,
	Text,
	StyleSheet,
	Pressable,
	useWindowDimensions,
	FlatList,
} from "react-native";



export default function SingleMessageScreen({ route, navigation }) {
	const { user } = useContext(UserContext);
	const { chatID } = route.params;
	const [currUser, setCurrUser] = useState("");
	const [otherUser, setOtherUser] = useState("");
	const [newMessage, setNewMessage] = useState("");
	const [messages, setMessages] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [title, setTitle] = useState("");
	console.log(otherUser);

  const Comment = (props) => {
    const { item } = props;
    const time = item.postedAt.slice(0,10)+' '+item.postedAt.slice(11,16)
    return (
      <View>
        <Text>{item.username} {time}</Text>
        <Text>{item.message}</Text>
      </View>
    );
  };

	function handleChange(value) {
		setNewMessage(value);
	}

	function handleSubmit() {
		addMessage(chatID, currUser.username, newMessage).then(() => {
			setMessages((curr) => [
				...curr,
				{ username: currUser.username, message: newMessage, postedAt: timestamp("DD/MM/YYYY:HH:mm:ss:ms")}
			]);
			setNewMessage("");
		});
	}

	useEffect(async () => {
		setIsLoading(true);
		const chat = await getChat(chatID);
		const currUser = await getUserDetails(user);
		setCurrUser(currUser);
		const msgs = [];
    console.log(chat);
		if (chat.messages.length > 0) {
			chat.messages.forEach((message) => {
				msgs.push(message);
			});
			setMessages(msgs);
		}
		for (const user of chat.members) {
			if (user !== currUser) {
				const otherUserObj = await getUserDetails(user);

				setOtherUser(otherUserObj);
			}
		}

		setTitle(chat.book);

		setIsLoading(false);
	}, []);

	return isLoading ? (
		<Text>Loading...</Text>
	) : (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<Text>
				{title} || {otherUser.username}
			</Text>
			<SafeAreaView style={styles.container}>
				<FlatList
					data={messages}
					renderItem={Comment}
					keyExtractor={(item, index) => item.postedAt+index}
				/>
			</SafeAreaView>

			<TextInput
				placeholder="New message"
				style={styles.textInput}
				onChangeText={handleChange}
				value={newMessage}
			/>
			<Pressable style={styles.submit} onPress={handleSubmit}>
				<Text>Send</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	submit: {
		borderWidth: 1,
		marginLeft: 5,
		paddingLeft: 5,
		width: 55,
		height: 55,
		backgroundColor: "white",
		margin: 10,
		padding: 8,
		borderRadius: 14,
	},
	textInput: {
		borderWidth: 1,
		marginLeft: 5,
		paddingLeft: 5,
		width: 300,
		height: 55,
		backgroundColor: "white",
		margin: 10,
		padding: 8,
		borderRadius: 14,
	},
});
