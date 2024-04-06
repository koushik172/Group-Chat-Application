import React, { useEffect, useState } from "react";

import axios from "axios";

import { useContactContext } from "../../../Context/ContactContext";

export default function Group({ group, index }) {
	const { setCurrentGroupChat, setChatBox, socket } = useContactContext();

	async function selectChat(e) {
		let li = e.currentTarget;
		const currentGroup = { groupId: "", groupName: "" };
		currentGroup.groupId = li.getAttribute("name");
		currentGroup.groupName = li.querySelectorAll("div")[0].getAttribute("name");
		setCurrentGroupChat(currentGroup);
		localStorage.setItem("chatBox", "group");
		setChatBox("group");
	}

	async function getMessage() {
		try {
			let currentMessages = JSON.parse(localStorage.getItem("group-" + group.groupId));
			if (currentMessages) {
				let groupChatId = currentMessages.length > 0 ? currentMessages[0].id : 0;
				const res = await axios.get(`http://${import.meta.env.VITE_SERVER_IP}/group-chat/get-message/${group.groupId}/${groupChatId}`, {
					headers: { Authorization: localStorage.getItem("Token") },
				});
				res.data.forEach((element) => {
					currentMessages.unshift(element);
					if (currentMessages.length > 20) {
						currentMessages.pop();
					}
				});
				localStorage.setItem("group-" + group.groupId, JSON.stringify(currentMessages));
			} else {
				const res = await axios.get(`http://${import.meta.env.VITE_SERVER_IP}/group-chat/get-message/${group.groupId}/0`, {
					headers: { Authorization: localStorage.getItem("Token") },
				});
				localStorage.setItem("group-" + group.groupId, JSON.stringify(res.data));
			}
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		getMessage();
	}, []);

	return (
		<>
			{
				<li name={group.groupId} key={index} className="p-2 gap-1 flex flex-col cursor-pointer" onClick={selectChat}>
					<div className="flex items-baseline justify-between" name={group.groupName}>
						<p className="whitespace-pre font-bold text-xl" name="user2Name">
							{group.groupName}
						</p>
					</div>

					<div className="w-full flex whitespace-pre text-sm font-semibold">
						Last Text: <p className="font-thin">Lorem, ipsum dolor sit por vas</p>
					</div>
				</li>
			}
		</>
	);
}
