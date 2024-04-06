import React, { useEffect, useState } from "react";

import axios from "axios";

import { useContactContext } from "../../../Context/ContactContext";

import ManageMenu from "./ManageMenu";

export default function GroupChat() {
	const { currentGroupChat, socket } = useContactContext();

	const [message, setMessage] = useState("");

	const [messageStorage, setMessageStorage] = useState(JSON.parse(localStorage.getItem(currentGroupChat.groupId)));

	const [manageMenu, setManageMenu] = useState(false);

	const Username = localStorage.getItem("Username");

	function toogleManageMenu() {
		if (!currentGroupChat.groupId) return;
		setManageMenu(!manageMenu);
	}

	async function handleMessageChange(e) {
		setMessage(e.target.value);
	}

	async function sendMessage() {
		if (!currentGroupChat.groupId) {
			alert("Select a chat!");
			return;
		}

		console.log(socket.rooms);

		if (socket) {
			socket.emit("sendGroupMessage", { groupId: currentGroupChat.groupId, message: message });
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
				{/* Group Chat Header */}
				<div className="bg-violet-900/80 w-full flex p-2 rounded-md font-semibold">
					<button className=" text-xl cursor-pointer items-center px-8" onClick={toogleManageMenu}>
						{currentGroupChat.groupName ? currentGroupChat.groupName : "Select a Group"}
						{currentGroupChat.groupName && <a className="text-xs  whitespace-pre text-slate-200/50"> click for more info.</a>}
					</button>
				</div>

				{manageMenu === true ? (
					// Manage Menu
					<ManageMenu />
				) : (
					// Chat Messages
					<ol className="bg-violet-700/40 w-full h-[12rem] md:h-[12rem] lg:h-full p-2 m-2 rounded-md px-16 pt-8 overflow-y-auto">
						{currentGroupChat.groupName ? (
							<div>
								{messageStorage &&
									messageStorage
										.slice()
										.reverse()
										.map((item, index) => {
											return (
												<li
													className={`flex ${Username !== item.senderName ? "justify-start " : "justify-end "}`}
													key={index}
												>
													<div>
														{/* USER NAME TAG */}
														<div className={`flex ${Username !== item.senderName ? "justify-start" : "justify-end"}`}>
															<p
																className={` mt-2 px-2 rounded-t-md  ${
																	Username !== item.senderName ? " bg-blue-700/40 " : " bg-cyan-600/60"
																}`}
															>
																{item.senderName}
															</p>
														</div>

														{/* MESSAGE */}
														<p
															className={` mb-2 px-2 pb-1 rounded-b-md w-fit ${
																Username !== item.senderName ? " bg-blue-800/60" : " bg-cyan-700/60"
															}`}
														>
															{item.message}
														</p>
													</div>
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
				)}

				{/* Group Chat Box */}
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
