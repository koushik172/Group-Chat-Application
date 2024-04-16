import React, { useEffect, useState } from "react";

import axios from "axios";

import { useContactContext } from "../../../Context/ContactContext";

export default function Contact({ contact, index }) {
	const { setCurrentChat, setChatBox } = useContactContext();

	let chatData;

	if (localStorage.getItem(contact.id)) {
		chatData = JSON.parse(localStorage.getItem(contact.id))[0];
	}

	async function selectChat(e) {
		let li = e.currentTarget;
		const selectedChat = { contactId: "", user2Name: "" };
		selectedChat.contactId = li.getAttribute("name");
		selectedChat.user2Id = li.querySelectorAll("div")[0].getAttribute("name");
		selectedChat.user2Name = li.querySelector('p[name="user2Name"]').textContent;
		setCurrentChat(selectedChat);
		localStorage.setItem("chatBox", "contacts");
		setChatBox("contacts");
	}

	async function getMessage() {
		try {
			let currentMessages = JSON.parse(localStorage.getItem(contact.id));

			if (currentMessages) {
				let chatId = currentMessages.length > 0 ? currentMessages[0].id : 0;

				const res = await axios.get(`http://${import.meta.env.VITE_SERVER_IP}/chat/get-message/${contact.id}/${chatId}`, {
					headers: { Authorization: localStorage.getItem("Token") },
				});

				res.data.forEach((element) => {
					currentMessages.unshift(element);
					if (currentMessages.length > 20) {
						currentMessages.pop();
					}
				});

				localStorage.setItem(contact.id, JSON.stringify(currentMessages));
			} else {
				const res = await axios.get(`http://${import.meta.env.VITE_SERVER_IP}/chat/get-message/${contact.id}/0`, {
					headers: { Authorization: localStorage.getItem("Token") },
				});
				localStorage.setItem(contact.id, JSON.stringify(res.data));
			}
		} catch (error) {
			console.log(error);
		}
	}

	function getLastText() {
		if (chatData === undefined) {
			return "No Chat";
		} else if (chatData.type === "message") {
			return chatData.message;
		} else {
			return chatData.type;
		}
	}

	useEffect(() => {
		getMessage();
	}, []);

	return (
		<>
			{
				<li name={contact.id} key={index} className="p-2 gap-1 flex flex-col cursor-pointer" onClick={selectChat}>
					<div
						className="flex items-baseline justify-between"
						name={contact.user1Name === localStorage.getItem("Username") ? contact.user2Id : contact.user1Id}
					>
						<p className="whitespace-pre font-bold text-xl" name="user2Name">
							{contact.user1Name === localStorage.getItem("Username") ? contact.user2Name : contact.user1Name}
						</p>
					</div>

					<div className="w-full flex whitespace-pre text-sm font-semibold">
						Last Text:{" "}
						<div className="font-thin">
							<p className="font-thin">{getLastText()}</p>
						</div>
					</div>
				</li>
			}
		</>
	);
}
