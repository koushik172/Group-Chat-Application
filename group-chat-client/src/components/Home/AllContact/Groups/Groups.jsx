import React, { useEffect, useState } from "react";
import axios from "axios";

import { useContactContext } from "../../../Context/ContactContext";
import Group from "./Group";

export default function Groups() {
	const { setPanel, socket } = useContactContext();

	const [showNewGroupForm, setShowNewGroupForm] = useState(false);

	const [showJoinGroupForm, setShowJoinGroupForm] = useState(false);

	const [newGroupName, setNewGroupName] = useState("");

	const [joinGroupId, setJoinGroupId] = useState("");

	const [memberGroups, setMemberGroups] = useState();

	function toogleShowNewGroupForm() {
		setShowNewGroupForm(!showNewGroupForm);
		setShowJoinGroupForm(false);
	}

	function toogleJoinGroupForm() {
		setShowJoinGroupForm(!showJoinGroupForm);
		setShowNewGroupForm(false);
	}

	function tooglePanel() {
		setPanel("contacts");
		localStorage.setItem("panel", "contacts");
	}

	async function createGroup() {
		try {
			const res = await axios.post(
				`http://${import.meta.env.VITE_SERVER_IP}/group/create-group`,
				{ groupName: newGroupName },
				{
					headers: { Authorization: localStorage.getItem("Token") },
				}
			);
			alert(res.data);
		} catch (error) {
			console.log(error);
		}
	}

	async function joinGroup() {
		try {
			const res = await axios.post(
				`http://${import.meta.env.VITE_SERVER_IP}/group/join-group`,
				{ groupId: joinGroupId },
				{
					headers: { Authorization: localStorage.getItem("Token") },
				}
			);
			alert(res.data);
			getGroups();
		} catch (error) {
			console.log(error);
		}
	}

	async function getGroups() {
		try {
			const res = await axios.get(`http://${import.meta.env.VITE_SERVER_IP}/group/get-groups`, {
				headers: { Authorization: localStorage.getItem("Token") },
			});
			setMemberGroups(res.data.memberGroups);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		getGroups();
	}, []);

	useEffect(() => {
		if (socket) {
			socket.on("groupMessage", (message) => {
				try {
					let currentMessages = JSON.parse(localStorage.getItem("group-" + message.groupId));

					if (currentMessages) {
						currentMessages.unshift(message);
						if (currentMessages.length > 20) {
							currentMessages.pop();
						}

						localStorage.setItem("group-" + message.groupId, JSON.stringify(currentMessages));
					}
				} catch (error) {
					console.log(error);
				}
			});
		}
	}, [socket]);

	useEffect(() => {
		memberGroups &&
			memberGroups.forEach((member, index) => {
				socket.emit("joinGroup", { groupId: member.groupId });
			});
	}, [memberGroups]);

	return (
		<div className="h-full  flex flex-col justify-end items-center py-4 pl-4 overflow-y-auto">
			<div className="w-full flex ">
				<span className="bg-violet-900/80 text-slate-200 font-bold text-lg w-full flex justify-between items-center p-2 mb-2 rounded-s-md">
					<i className="fa-solid fa-user-group px-2"></i>
					<div className="select-none">
						<a onClick={toogleShowNewGroupForm} className="cursor-pointer px-2 text-md items-center rounded-md">
							➕
						</a>
						<a onClick={toogleJoinGroupForm} className="cursor-pointer px-2 text-md items-center rounded-md">
							🔍
						</a>
					</div>
				</span>
				<button
					className="bg-violet-700/80 text-slate-200 font-bold text-lg  flex justify-between items-center p-2 mb-2 rounded-e-md"
					onClick={tooglePanel}
				>
					<i className="fa-solid fa-user  px-2"></i>
				</button>
			</div>

			{showNewGroupForm && (
				<div className="flex flex-col gap-2 p-2 w-full mb-2 rounded-md bg-violet-800/80">
					<div htmlFor="" className="text-slate-200 text-center font-semibold text-xl">
						Create Group
					</div>
					<input
						placeholder="Enter group name"
						className="p-1 rounded-sm text-center"
						value={newGroupName}
						type="text"
						onChange={(e) => setNewGroupName(e.target.value)}
					/>
					<button className="text-slate-200 bg-slate-300/50 py-1 rounded-sm" onClick={createGroup}>
						Create Group
					</button>
				</div>
			)}

			{showJoinGroupForm && (
				<div className="flex flex-col gap-2 p-2 w-full mb-2 rounded-md bg-violet-800/80">
					<div htmlFor="" className="text-slate-200 text-center font-semibold text-xl">
						Join Group
					</div>
					<input
						placeholder="Enter group Id"
						className="p-1 rounded-sm text-center"
						value={joinGroupId}
						type="text"
						onChange={(e) => setJoinGroupId(e.target.value)}
					/>
					<button className="text-slate-200 bg-slate-300/50 py-1 rounded-sm" onClick={joinGroup}>
						Join Group
					</button>
				</div>
			)}

			<ol className="bg-blue-700/40 text-slate-300 w-full h-full rounded-md overflow-y-auto">
				{memberGroups &&
					memberGroups.map((group, index) => {
						return <Group group={group} key={index} />;
					})}
			</ol>
		</div>
	);
}
