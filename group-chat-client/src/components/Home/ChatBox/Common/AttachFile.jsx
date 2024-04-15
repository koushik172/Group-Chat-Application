import React, { useRef } from "react";

import axios from "axios";

import { useContactContext } from "../../../Context/ContactContext";

export default function AttachFile() {
	const { socket, currentChat, currentGroupChat } = useContactContext();

	const acceptedFileTypes = ["text/plain", "text/xml", "image/png", "image/gif", "video/mp4", "audio/mp3", "audio/mpeg"];

	const fileInput = useRef();

	function selectFile() {
		fileInput.current.click();
	}

	const handleFileChange = async (event) => {
		if (event.target.files.length > 0) {
			const currentChatBox = localStorage.getItem("chatBox");

			if (!(currentChatBox === "contacts" && currentChat.contactId) && !(currentChatBox === "group" && currentGroupChat.groupId)) {
				alert("Select a chat.");
				return;
			}

			const file = event.target.files[0];

			if (file.size > 20 * 1024 * 1024) {
				alert("File size exceeded. Limit 20MB");
				return;
			}

			if (acceptedFileTypes.includes(file.type)) {
				try {
					let response = await axios.post(
						`http://${import.meta.env.VITE_SERVER_IP}/upload`,
						{ file: file },
						{
							headers: {
								Authorization: localStorage.getItem("Token"),
								"Content-Type": "multipart/form-data",
							},
						}
					);

					const { status, data } = response.data;
					if (status === "success") {
						let message = `${data.originalname}-${data.location}`;
						if (currentChatBox === "contacts" && currentChat.contactId) {
							if (socket) {
								socket.emit("send-message", { chatData: currentChat, message: message, type: data.mimetype });
							}
						} else if (currentChatBox === "group" && currentGroupChat.groupId) {
							if (socket) {
								socket.emit("sendGroupMessage", { groupId: currentGroupChat.groupId, message: message, type: data.mimetype });
							}
						}
					} else {
						alert("Unable to send file.");
					}
				} catch (error) {
					console.log(error);
				}
			} else {
				console.log(file);
				alert("File not supported");
			}
		}
	};

	return (
		<>
			<div className="flex items-center bg-blue-900/70 hover:bg-blue-700/60 px-2 rounded-md" onChange={handleFileChange} onClick={selectFile}>
				<input type="file" className="hidden" ref={fileInput} />
				<i className="fa-solid fa-paperclip"></i>
			</div>
		</>
	);
}
