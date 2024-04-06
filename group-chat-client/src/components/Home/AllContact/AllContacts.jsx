import React, { useEffect } from "react";

import Contacts from "./Contacts/Contacts";
import Groups from "./Groups/Groups";

import { useContactContext } from "../../Context/ContactContext";

export default function AllContact() {
	const { panel } = useContactContext();

	return (
		<>
			<div className={`${panel === "contacts" ? "" : "hidden"} w-2/12`}>
				<Contacts />
			</div>
			<div className={`${panel === "groups" ? "" : "hidden"} w-2/12`}>
				<Groups />
			</div>
		</>
	);
}
