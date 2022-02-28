import { createContext, useState } from "react";
import { auth } from "../db/firestore.js";

export const UserContext = createContext();

export function UserProvider({ children }) {
	const [user, setUser] = useState(null);

	auth.onAuthStateChanged((userInfo) => {
		if (userInfo) {
			setUser(userInfo.uid);
		}
	});

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
}
