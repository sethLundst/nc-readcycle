import * as React from "react";
import {
	TextInput,
	View,
	Text,
	StyleSheet,
	Pressable,
	FlatList,
	SafeAreaView,
} from "react-native";
import { getChats, db } from "../db/firestore";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/User";
import { collection, query, where, onSnapshot } from "firebase/firestore";

export default function MessagesScreen({ route, navigation }) {
	const { user } = useContext(UserContext);
	const [isLoading, setIsLoading] = useState(true);
	const [chats, setChats] = useState([]);

	const q = query(
		collection(db, "chats"),
		where("members", "array-contains", `${user}`)
	);

	const handlePress = (ID) => {
		navigation.navigate("SingleMessageScreen", { chatID: ID });
	};

	useEffect(async () => {
		setIsLoading(true);
		await onSnapshot(q, (querySnapshot) => {
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

		return (
			<Pressable style={styles.chatThumb} onPress={() => handlePress(chatID)}>
				<Text>{item.book}</Text>
			</Pressable>
		);
	};

	return isLoading ? (
		<Text>All messages</Text>
	) : (
		<View>
			<SafeAreaView>
				<FlatList
					data={chats}
					renderItem={Chat}
					keyExtractor={(item, index) => index}
				/>
			</SafeAreaView>
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
	},
});
