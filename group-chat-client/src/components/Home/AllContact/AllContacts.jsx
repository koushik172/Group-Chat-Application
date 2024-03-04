import React, { useEffect } from "react";

import Contacts from "./Contacts/Contacts";
import Groups from "./Groups/Groups";

import { useContactContext } from "../../Context/ContactContext";

export default function AllContact() {
	const { panel } = useContactContext();

	return <> {panel === "contacts" ? <Contacts /> : <Groups />} </>;
}
