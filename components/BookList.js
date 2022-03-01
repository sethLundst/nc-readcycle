import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../contexts/User";
import {
	FlatList,
	StyleSheet,
	Text,
	View,
	Image,
	TextInput,
	Icon,
	TouchableOpacity,
} from "react-native";
import { getDistance, convertDistance } from "geolib";
import { getAllUsers, getUserDetails } from "../db/firestore";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
	},
	list: {
		width: "100%",
	},
	image: {
		marginTop: 25,
		marginHorizontal: 25,
		marginBottom: 5,
		width: 130,
		height: 165,
		alignItems: "center",
	},
	title: {
		width: 130,
		textAlign: "center",
		paddingTop: 30,
	},
	bookBox: {
		alignItems: "center",
		justifyContent: "center",
		paddingLeft: 0,
	},
	searchbarInput: {
		borderColor: "#1323",
		borderWidth: 2,
		borderRadius: 20,
		marginTop: 90,
		padding: 7,
		textAlign: "center",
	},
	treesSaved: {
		marginTop: 10,
	},
	bookFilter: {
		marginTop: 10,
	},
});

const BookList = ({ navigation }) => {
	const [search, setSearch] = useState("");
	const [filteredDataSource, setFilteredDataSource] = useState([]);
	const [allUsers, setAllUsers] = useState([]);
	const [allBooks, setAllBooks] = useState();
	const [currentUser, setCurrentUser] = useState();
	const { user, setUser } = useContext(UserContext);

	const searchFilterFunction = (text) => {
		if (text) {
			const newData = allBooks.filter((book) => {
				return book.title.toLowerCase().includes(text.toLowerCase());
			});
			setFilteredDataSource(newData);
			setSearch(text);
		} else {
			setFilteredDataSource(allBooks);
			setSearch(text);
		}
	};

	const ItemView = ({ item }) => {
		return (
			<View style={styles.bookBox}>
				<TouchableOpacity
					key={item.id}
					style={styles.image}
					onPress={() => {
						navigation.navigate("SingleBookScreen", {
							screen: "SingleBookScreen",
							params: { item: item },
						});
					}}>
					<Image
						style={styles.image}
						source={{
							uri: item.highResImage,
						}}
						style={styles.image}
					/>
				</TouchableOpacity>
				<Text style={styles.title}>{item.title}</Text>
				<Text>{item.distance} miles away.</Text>
			</View>
		);
	};

	function calculateBookDistance(book, userLocation) {
		const result = convertDistance(
			getDistance(userLocation, {
				latitude: book.coordinates.latitude,
				longitude: book.coordinates.longitude,
			}),
			"mi"
		).toFixed(2);
		return result;
	}
	let userLocation;
	useEffect(() => {
		const fetchCurrentUser = async (user) => {
			const result = await getUserDetails(user);
			setCurrentUser(result);
		};
		const fetchAllBooks = async (user) => {
			const result = await getAllUsers();
			const books = [];
			let userLocation = {};
			for (let i = 0; i < result.length; i++) {
				for (let j = 0; j < result[i].books.length; j++) {
					if (user !== result[i].books[j].uid) {
						books.push(result[i].books[j]);
					} else {
						userLocation = result[i].books[j].coordinates;
					}
				}
			}
			for (let i = 0; i < books.length; i++) {
				books[i].distance = Number(
					calculateBookDistance(books[i], userLocation)
				);
			}
			const sortedBooks = books.sort((a, b) => {
				return a.distance - b.distance;
			});
			setAllBooks(sortedBooks);
			setAllUsers(result);
			setFilteredDataSource(books);
		};
		fetchCurrentUser(user);
		fetchAllBooks(user);
	}, [user, getAllUsers, getUserDetails]);

	return (
		<View style={styles.container}>
			<View style={styles.searchbarContainer}>
				<TextInput
					style={styles.searchbarInput}
					value={search}
					placeholder="search books..."
					onChangeText={(text) => {
						searchFilterFunction(text);
					}}
				/>
			</View>
			<View style={styles.bookFilter}>
				<Text>112 trees saved</Text>
				<Text>Showing {filteredDataSource.length} books...</Text>
			</View>
			<View></View>
			<View style={styles.list}>
				<FlatList
					numColumns={2}
					keyExtractor={(_item, index) => index}
					data={filteredDataSource}
					renderItem={ItemView}
				/>
			</View>
		</View>
	);
};

export default BookList;
