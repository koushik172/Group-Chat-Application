import React, { useEffect, useState } from "react";

import axios from "axios";

import { useContactContext } from "../../../Context/ContactContext";

export default function GroupChat() {
	const { currentGroupChat } = useContactContext();

	const [message, setMessage] = useState("");

	const [messageStorage, setMessageStorage] = useState(JSON.parse(localStorage.getItem(currentGroupChat.groupId)));

	const Username = localStorage.getItem("Username");

	async function handleMessageChange(e) {
		setMessage(e.target.value);
	}

	async function sendMessage() {
		if (!currentGroupChat.groupId) {
			alert("Select a chat!");
			return;
		}

		try {
			await axios.post(
				`http://${import.meta.env.VITE_SERVER_IP}/group-chat/send-message`,
				{ message: message, groupId: currentGroupChat.groupId },
				{
					headers: { Authorization: localStorage.getItem("Token") },
				}
			);
		} catch (error) {
			console.log(error);
		}

		setMessage("");
	}

	useEffect(() => {
		setMessageStorage(JSON.parse(localStorage.getItem("group-" + currentGroupChat.groupId)));
	}, [currentGroupChat]);

	useEffect(() => {
		const interval = setInterval(() => {
			const newMessageStorage = JSON.parse(localStorage.getItem("group-" + currentGroupChat.groupId));
			if (JSON.stringify(newMessageStorage) !== JSON.stringify(messageStorage)) {
				setMessageStorage(newMessageStorage);
			}
		}, 1000);

		// Cleanup: clear the interval when the component unmounts
		return () => clearInterval(interval);
	}, [currentGroupChat, messageStorage]);

	return (
		<>
			<div className="h-full w-10/12 flex flex-col justify-between items-center p-4 text-slate-200 ">
				{/* Chat Header */}
				<p className="bg-violet-900/80 w-full flex justify-center p-3 rounded-md font-semibold">
					{currentGroupChat.groupName ? currentGroupChat.groupName : "Select a Group"}
				</p>

				{/* Chat Board */}
				<ol className="bg-violet-700/40 w-full h-[12rem] md:h-[12rem] lg:h-full p-2 m-2 rounded-md px-16 pt-8 overflow-y-auto">
					{currentGroupChat.groupName ? (
						<div>
							{messageStorage &&
								messageStorage
									.slice()
									.reverse()
									.map((item, index) => {
										console.log(item.senderName);
										return (
											<li className={`${Username !== item.senderName ? "text-left" : "text-right"}`} key={index}>
												{item.message}
											</li>
										);
									})}
						</div>
					) : (
						<div className="flex justify-center items-center h-full text-6xl font-semibold">
							Welcome {localStorage.getItem("Username")}
						</div>
					)}
				</ol>

				{/* Chat Box */}
				<div className="bg-violet-700/40 w-full p-2 gap-2 flex rounded-md">
					<input name="" className="rounded-md w-full text-slate-800/80 px-2" value={message} onChange={handleMessageChange}></input>
					<button
						className={` px-4 py-1 rounded-md text-slate-200 font-semibold flex ${!message.length ? "bg-sky-900/80" : "bg-sky-500/80"}`}
						disabled={!message.length}
						onClick={sendMessage}
					>
						Send
					</button>
				</div>
			</div>
		</>
	);
}
