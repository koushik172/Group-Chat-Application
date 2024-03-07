import React from "react";

import ContactChat from "./Contact/ContactChat";
import GroupChat from "./Group/GroupChat";

import { useContactContext } from "../../Context/ContactContext";

export default function ChatBox() {
	const { chatBox } = useContactContext();

	return <>{chatBox === "contacts" ? <ContactChat /> : <GroupChat />}</>;
}
