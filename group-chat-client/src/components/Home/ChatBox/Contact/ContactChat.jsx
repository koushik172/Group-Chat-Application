import React, { useEffect, useState } from "react";

import { useContactContext } from "../../../Context/ContactContext";
import ContactMessage from "./ContactMessage";
import AttachFile from "../Common/AttachFile";
import ManageMenu from "./ManageMenu";

export default function ContactChat() {
	const { currentChat, socket } = useContactContext();

	const [manageMenu, setManageMenu] = useState(false);

	const [message, setMessage] = useState("");

	const [messageStorage, setMessageStorage] = useState(JSON.parse(localStorage.getItem(currentChat.contactId)));

	async function handleMessageChange(e) {
		setMessage(e.target.value);
	}

	function toogleManageMenu() {
		// console.log(currentChat);
		if (!currentChat.user2Name) return;
		setManageMenu(!manageMenu);
	}

	async function sendMessage() {
		if (!currentChat.contactId) {
			alert("Select a chat!");
			return;
		}

		if (socket) {
			socket.emit("send-message", { chatData: currentChat, message: message, type: "message" });
		}

		setMessage("");
	}

	useEffect(() => {
		setMessageStorage(JSON.parse(localStorage.getItem(currentChat.contactId)));
	}, [currentChat]);

	useEffect(() => {
		const interval = setInterval(() => {
			const newMessageStorage = JSON.parse(localStorage.getItem(currentChat.contactId));
			if (JSON.stringify(newMessageStorage) !== JSON.stringify(messageStorage)) {
				setMessageStorage(newMessageStorage);
			}
		}, 1000);

		// Cleanup: clear the interval when the component unmounts
		return () => clearInterval(interval);
	}, [currentChat, messageStorage]);

	return (
		<>
			<div className="h-full w-10/12 flex flex-col justify-between items-center p-4 text-slate-200 ">
				{/* Chat Header */}
				<div className="bg-violet-700/80 w-full flex p-2 rounded-md font-semibold">
					<button className=" text-xl cursor-pointer items-center px-8" onClick={toogleManageMenu}>
						{currentChat.user2Name ? currentChat.user2Name : "Select a Group"}
						{currentChat.user2Name && <a className="text-xs  whitespace-pre text-slate-200/50"> click for more info.</a>}
					</button>
				</div>

				{/* Chat Board */}

				{manageMenu === true ? (
					// Manage Menu
					<ManageMenu />
				) : (
					<ol className="bg-blue-600/50 w-full h-[12rem] md:h-[12rem] lg:h-full p-2 m-2 rounded-md px-16 pt-8 overflow-y-auto">
						{currentChat.user2Name ? (
							<div>
								{messageStorage &&
									messageStorage
										.slice()
										.reverse()
										.map((item, index) => {
											return <ContactMessage key={index} item={item} index={index} currentChat={currentChat} />;
										})}
							</div>
						) : (
							<div className="flex justify-center items-center h-full text-6xl font-semibold">
								Welcome {localStorage.getItem("Username")}
							</div>
						)}
					</ol>
				)}

				{/* Chat Box */}
				<div className="bg-violet-700/80 w-full p-2 gap-2 flex rounded-md">
					<input name="" className="rounded-md w-full text-slate-800/80 px-2" value={message} onChange={handleMessageChange}></input>
					<AttachFile />
					<button
						className={` px-4 py-1 rounded-md text-slate-200 font-semibold flex ${!message.length ? "bg-sky-900/80" : "bg-sky-500/80"}`}
						disabled={!message.length}
						onClick={sendMessage}
					>
						<i className="fa-solid fa-paper-plane py-1 px-2"></i>
					</button>
				</div>
			</div>
		</>
	);
}
