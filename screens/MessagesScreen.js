import * as React from "react";
import {
	TextInput,
	View,
	Text,
	StyleSheet,
	Pressable,
	FlatList,
	SafeAreaView,
	Image,
} from "react-native";
import { getChats, db, getUserDetails } from "../db/firestore";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/User";
import { collection, query, where, onSnapshot } from "firebase/firestore";

export default function MessagesScreen({ route, navigation }) {
	const { user } = useContext(UserContext);
	const [isLoading, setIsLoading] = useState(true);

	const [chats, setChats] = useState([
		{ messages: [{ postedAt: "", message: "" }] },
	]);

	const handlePress = (ID) => {
		navigation.navigate("SingleMessageScreen", { chatID: ID });
	};
	const q = query(
		collection(db, "chats"),
		where("members", "array-contains", `${user}`)
	);
	useEffect(() => {
		setIsLoading(true);
		onSnapshot(q, (querySnapshot) => {
			const chats = [];

			querySnapshot.forEach((doc) => {
				chats.push(doc.data());
			});

			setChats(chats);
		});

		setIsLoading(false);
	}, []);

	const Chat = ({ item }) => {
		const chatID = item.id;

		if (item.messages.length) {
			const latestMessage = item.messages[item.messages.length - 1];
			let timestamp = latestMessage.postedAt;
			let time = timestamp.slice(0, 10) + " " + timestamp.slice(11, 16);

			return (
				<Pressable style={styles.chatThumb} onPress={() => handlePress(chatID)}>
					<View style={styles.thumbLeft}>
						<Text style={styles.chatThumbHeader}>{item.book} </Text>
						<View style={styles.chatThumbText}>
							<Text style={styles.grey}>
								{latestMessage.username} {time}
							</Text>
							<Text style={styles.grey}>{latestMessage.message.slice(0, 35)}... </Text>
						</View>
					</View>
					<View style={styles.thumbRight}>
						<Image
							style={styles.pic}
							source={{
								uri: item.picture,
							}}
						/>
					</View>
				</Pressable>
			);
		} else {
			return (
				<Pressable style={styles.chatThumb} onPress={() => handlePress(chatID)}>
					<Text style={styles.chatThumbHeader}>{item.book} </Text>
				</Pressable>
			);
		}
	};

	return isLoading ? (
		<Text>All messages</Text>
	) : (
		<View>
			<FlatList
				data={chats}
				renderItem={Chat}
				keyExtractor={(item, index) => index}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		height: "20%",
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	list: {
		height: "50%",
	},
	chatThumb: {
		backgroundColor: "white",
		padding: 8,
		margin: 1,
		borderRadius: 3,
		flexDirection: "row",
	},
	chatThumbHeader: {
		fontWeight: "bold",
		fontSize: 15,
    margin:5
	},
	pic: {
		height: 75,
		width: 75,
    borderRadius: 100
	},
	thumbLeft: {
		width: "50%",
	},
	thumbRight: {
		width: "50%",
		justifyContent: "center",
		alignContent: "center",
    alignItems: "center"
	},
  chatThumbText:{
    margin:5,
    color: "gainsboro"
  },
  grey: {
    color: "gray"
  }

});
