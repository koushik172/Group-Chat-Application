import React, { createContext, useContext, useState } from "react";

// Define the context
const ContactContext = createContext();

// Define the context provider
export const ContactProvider = ({ children }) => {
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

	return (
		<ContactContext.Provider value={{ currentChat, setCurrentChat, panel, currentGroupChat, setCurrentGroupChat, setPanel, chatBox, setChatBox }}>
			{children}
		</ContactContext.Provider>
	);
};

export const useContactContext = () => useContext(ContactContext);
