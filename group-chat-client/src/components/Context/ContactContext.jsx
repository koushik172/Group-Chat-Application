import React, { createContext, useContext, useState, useEffect } from "react";
import io from "socket.io-client";

// Define the context
const ContactContext = createContext();

// Define the context provider
export const ContactProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);

	const [currentChat, setCurrentChat] = useState({
		contactId: "",
		user2Id: "",
		user2Name: "",
	});

	const [currentGroupChat, setCurrentGroupChat] = useState({
		groupId: "",
		groupName: "",
	});

	const [panel, setPanel] = useState(localStorage.getItem("panel") || "contacts");

	const [chatBox, setChatBox] = useState(localStorage.getItem("chatBox") || "contacts");

	useEffect(() => {
		const newSocket = io.connect("http://localhost:3000", {
			query: {
				userId: localStorage.getItem("UserId"),
				token: localStorage.getItem("Token"),
			},
		});
		setSocket(newSocket);
		return () => newSocket.close();
	}, []);

	return (
		<ContactContext.Provider
			value={{ currentChat, setCurrentChat, panel, currentGroupChat, setCurrentGroupChat, setPanel, chatBox, setChatBox, socket }}
		>
			{children}
		</ContactContext.Provider>
	);
};

export const useContactContext = () => useContext(ContactContext);
