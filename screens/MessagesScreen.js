import * as React from "react";
import {
	TextInput,
	View,
	Text,
	StyleSheet,
	Pressable,
	FlatList,
  SafeAreaView
} from "react-native";
import { getChats } from "../db/firestore";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/User";

export default function MessagesScreen({ route, navigation }) {
	const { user } = useContext(UserContext);
	const [isLoading, setIsLoading] = useState(true);
	const [chats, setChats] = useState([]);

const handlePress = (ID)=>{
  navigation.navigate("SingleMessageScreen", { chatID: ID })
}

	useEffect(async () => {
		setIsLoading(true);
		const chats = await getChats(user);
		setChats(chats);
		console.log(chats);
		setIsLoading(false);
	}, []);

	const Chat = ({ item }) => {
    const chatID = item.id
    console.log(chatID);
		return (
			<Pressable style={styles.chatThumb} onPress={()=>handlePress(chatID)}>
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
