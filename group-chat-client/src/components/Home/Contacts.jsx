import React, { useEffect, useState } from "react";
import axios from "axios";

import { useContactContext } from "../Context/ContactContext";

export default function Contact() {
	const { currentChat, setCurrentChat } = useContactContext();

	const [showContact, setShowContact] = useState(false);

	const [newContact, setNewContact] = useState("");

	const [contacts, setContacts] = useState("");

	function toogleContacts() {
		setShowContact(!showContact);
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

	async function selectChat(e) {
		let li = e.currentTarget;
		const selectedChat = { contactId: "", contactName: "", contactNumber: "" };
		selectedChat.contactId = li.getAttribute("name");
		selectedChat.contactName = li.querySelector('p[name="contactName"]').textContent;
		selectedChat.contactNumber = li.querySelector('p[name="contactNumber"]').textContent;
		setCurrentChat(selectedChat);
	}

	useEffect(() => {
		getContacts();
	}, []);

	useEffect(() => {}, [contacts, currentChat]);

	return (
		<div className="h-full w-2/12 flex flex-col justify-end items-center py-4 pl-4 overflow-y-auto">
			<p className="bg-violet-900/80 text-slate-200 font-bold text-lg w-full flex justify-between items-center p-2 mb-2 rounded-md">
				Contacts{" "}
				<a onClick={toogleContacts} className="cursor-pointer px-2 text-2xl items-center rounded-md">
					+
				</a>
			</p>

			{showContact && (
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

			<ol className="bg-violet-700/40 text-slate-300 w-full h-full rounded-md overflow-y-auto">
				{contacts &&
					contacts.map((contact, key) => {
						return (
							<li key={key} name={contact.id} className="p-2 gap-1 flex flex-col cursor-pointer" onClick={selectChat}>
								<div className="flex items-baseline justify-between">
									<p className="whitespace-pre font-bold text-xl" name="contactName">
										{contact.contactName}
									</p>
									<p className="text-sm font-semibold" name="contactNumber">
										{contact.contactNumber}
									</p>
								</div>
								<div className="w-full flex whitespace-pre text-sm font-semibold">
									Last Text: <p className="font-thin">Lorem, ipsum dolor sit por vas</p>
								</div>
							</li>
						);
					})}
			</ol>
		</div>
	);
}
