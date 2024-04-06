import React, { useEffect, useState } from "react";
import axios from "axios";

import { useContactContext } from "../../../Context/ContactContext";
import Contact from "./Contact";

export default function Contacts() {
	const { setPanel, socket } = useContactContext();

	const [showNewContactForm, setShowNewContactForm] = useState(false);

	const [newContact, setNewContact] = useState("");

	const [contacts, setContacts] = useState("");

	function toogleShowNewContactForm() {
		setShowNewContactForm(!showNewContactForm);
	}

	function tooglePanel() {
		setPanel("groups");
		localStorage.setItem("panel", "groups");
	}

	async function addContact() {
		if (newContact.length !== 10) {
			alert("Enter a correct contact number.");
			return;
		}
		if (!parseInt(newContact)) {
			alert("Enter a correct contact number.");
			return;
		}

		try {
			const res = await axios.post(
				`http://${import.meta.env.VITE_SERVER_IP}/contact/add-contact`,
				{ contact_number: newContact },
				{
					headers: { Authorization: localStorage.getItem("Token") },
				}
			);
			alert(res.data);
			setNewContact("");
			getContacts();
		} catch (error) {
			console.log(error);
		}
	}

	async function getContacts() {
		try {
			const res = await axios.get(`http://${import.meta.env.VITE_SERVER_IP}/contact/get-contacts`, {
				headers: { Authorization: localStorage.getItem("Token") },
			});
			setContacts(res.data.Contacts);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		getContacts();
	}, []);

	useEffect(() => {
		if (socket) {
			socket.on("message", (message) => {
				console.log(message);
				try {
					let currentMessages = JSON.parse(localStorage.getItem(message.contactId));

					if (currentMessages) {
						currentMessages.unshift(message);
						if (currentMessages.length > 20) {
							currentMessages.pop();
						}

						localStorage.setItem(message.contactId, JSON.stringify(currentMessages));
					}
				} catch (error) {
					console.log(error);
				}
			});
		}
	}, [socket]);

	useEffect(() => {}, [contacts]);

	return (
		<div className="h-full flex flex-col justify-end items-center py-4 pl-4 overflow-y-auto">
			<div className="w-full flex gap-2">
				<p className="bg-violet-900/80 text-slate-200 font-bold text-lg w-full flex justify-between items-center p-2 mb-2 rounded-md">
					Contacts{" "}
					<a onClick={toogleShowNewContactForm} className="cursor-pointer px-2 text-md select-none items-center rounded-md">
						➕
					</a>
				</p>
				<button
					className="bg-violet-700/80 text-slate-200 font-bold text-lg  flex justify-between items-center p-2 mb-2 rounded-md"
					onClick={tooglePanel}
				>
					Groups
				</button>
			</div>

			{showNewContactForm && (
				<div className="flex flex-col gap-2 p-2 w-full mb-2 rounded-md bg-violet-800/80">
					<input
						placeholder="Enter contact number"
						className="p-1 rounded-sm "
						value={newContact}
						type="number"
						onChange={(e) => setNewContact(e.target.value)}
					/>
					<button className="text-slate-200 bg-slate-300/50 py-1 rounded-sm" onClick={addContact}>
						Add Contact
					</button>
				</div>
			)}

			<ol className="bg-blue-700/40 text-slate-300 w-full h-full rounded-md overflow-y-auto">
				{contacts &&
					contacts.map((contact, index) => {
						return <Contact contact={contact} key={index} />;
					})}
			</ol>
		</div>
	);
}
