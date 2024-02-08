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

	return <ContactContext.Provider value={{ currentChat, setCurrentChat }}>{children}</ContactContext.Provider>;
};

// Custom hook to use the AppContext
export const useContactContext = () => useContext(ContactContext);
