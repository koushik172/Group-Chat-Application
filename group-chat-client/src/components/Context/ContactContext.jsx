import React, { createContext, useContext, useState, useEffect } from "react";

// Define the context
const ContactContext = createContext();

// Define the context provider
export const ContactProvider = ({ children }) => {
	const [currentChat, setCurrentChat] = useState({
		contactId: "",
		user2Id: "",
		user2Name: "",
	});

	const [currentGroup, setCurrentGroup] = useState({
		groupId: "",
		groupName: "",
		groupOwner: "",
	});

	const [panel, setPanel] = useState(localStorage.getItem("panel") || "contacts");

	return <ContactContext.Provider value={{ currentChat, setCurrentChat, panel, setPanel }}>{children}</ContactContext.Provider>;
};

export const useContactContext = () => useContext(ContactContext);
