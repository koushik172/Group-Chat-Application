import React, { useEffect, useState } from "react";

import axios from "axios";

import { useContactContext } from "../../../Context/ContactContext";

export default function ManageMenu() {
	const { currentGroupChat } = useContactContext();

	const [groupMembers, setGroupMembers] = useState();

	const [searchUserInput, setSearchUserInput] = useState("");

	const [searchUserData, setSearchUserData] = useState("");

	function handleSearchUserChange(e) {
		setSearchUserInput(e.target.value);
	}

	async function searchUser() {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;

		if (!emailRegex.test(searchUserInput) && !phoneRegex.test(searchUserInput)) {
			alert("Invalid email or phone.");
			return;
		} else {
			try {
				if (searchUser === "") return;
				let user = await axios.get(`http://${import.meta.env.VITE_SERVER_IP}/manage-group/search-user/${searchUserInput}`, {
					headers: { Authorization: localStorage.getItem("Token") },
				});
				console.log(user.data);
				setSearchUserData(user.data);
			} catch (error) {
				console.log(error);
				alert("No Records Found.");
				setSearchUserData("");
			}
		}
	}

	async function addNewMembers() {
		try {
			let result = await axios.post(
				`http://${import.meta.env.VITE_SERVER_IP}/manage-group/add-member/`,
				{ newMemberData: searchUserData, groupData: currentGroupChat },
				{
					headers: { Authorization: localStorage.getItem("Token") },
				}
			);
			alert(result.data);
			getGroupMembers();
		} catch (error) {
			console.log(error);
		}
	}

	async function removeMember(e) {
		let li = e.target.closest("li");
		const groupMemberId = li.getAttribute("name");

		try {
			let result = await axios.get(
				`http://${import.meta.env.VITE_SERVER_IP}/manage-group/remove-member/${currentGroupChat.groupId}/${groupMemberId}`,
				{
					headers: { Authorization: localStorage.getItem("Token") },
				}
			);
			if (result.data === "Removed") {
				alert("User removed from group.");
				getGroupMembers();
			} else if (result.data === "Unauthorized") {
				alert("Unauthorized. Contact Admins.");
			} else {
				alert("Error!");
			}
		} catch (error) {
			console.log(error);
			alert("Error");
		}
	}

	async function promoteToAdmin(e) {
		let li = e.target.closest("li");
		const groupMemberId = li.getAttribute("name");

		try {
			let result = await axios.post(
				`http://${import.meta.env.VITE_SERVER_IP}/manage-group/promote-member`,
				{ memberId: groupMemberId, groupId: currentGroupChat.groupId },
				{
					headers: { Authorization: localStorage.getItem("Token") },
				}
			);
			alert(result.data);
			getGroupMembers();
		} catch (error) {
			console.log(error);
			alert("Error");
		}
	}

	async function demoteFromAdmin(e) {
		let li = e.target.closest("li");
		const groupMemberId = li.getAttribute("name");

		try {
			let result = await axios.post(
				`http://${import.meta.env.VITE_SERVER_IP}/manage-group/demote-member/`,
				{ memberId: groupMemberId, groupId: currentGroupChat.groupId },
				{
					headers: { Authorization: localStorage.getItem("Token") },
				}
			);
			alert(result.data);
			getGroupMembers();
		} catch (error) {
			console.log(error);
		}
	}

	async function getGroupMembers() {
		try {
			let result = await axios.get(`http://${import.meta.env.VITE_SERVER_IP}/manage-group/get-members/${currentGroupChat.groupId}`, {
				headers: { Authorization: localStorage.getItem("Token") },
			});
			setGroupMembers(result.data.Members);
		} catch (error) {
			console.log(error);
		}
	}

	async function leaveGroup() {
		if (!window.confirm("Are you sure? You will no longer have access to the chats.")) return;
		try {
			let result = await axios.post(
				`http://${import.meta.env.VITE_SERVER_IP}/manage-group/leave-group`,
				{ groupId: currentGroupChat.groupId },
				{
					headers: { Authorization: localStorage.getItem("Token") },
				}
			);
			localStorage.removeItem("group-" + 1);
			location.reload();
		} catch (error) {
			console.log(error);
			alert("Error");
		}
	}

	useEffect(() => {
		if (currentGroupChat.groupId) getGroupMembers();
	}, [currentGroupChat.groupId]);

	useEffect(() => {}, [groupMembers]);

	useEffect(() => {}, [searchUserData]);

	return (
		<>
			{/* Manage Menu */}
			{currentGroupChat.groupId && (
				<div className="bg-blue-700/40 w-full flex flex-col p-2 rounded-md font-semibold my-2 h-full">
					{/* Add new member */}
					<div className="flex justify-between w-full px-8 py-2 items-center">
						<label className="text-lg whitespace-pre">Add New Member : </label>

						<input
							type="text"
							className="w-[50%] rounded-md py-1 px-2 text-slate-800"
							placeholder="Search by email or phone no."
							onChange={handleSearchUserChange}
						/>

						<button className="bg-blue-700/70 hover:bg-sky-500/80 px-2 py-1 rounded-md text-lg" onClick={searchUser}>
							Search
						</button>
					</div>

					{searchUserData && (
						<div className="grid grid-cols-4 gap-4 items-center px-8 py-4 text-xl" id={searchUserData.id} name="newMember">
							<p className="col-span-1">{searchUserData.name}</p>
							<p className="col-span-1">{searchUserData.email}</p>
							<p className="col-span-1 capitalize">{searchUserData.phone}</p>

							<button className="bg-blue-500/80 rounded-md text-white  px-2 py-1" onClick={addNewMembers}>
								Add Member
							</button>
						</div>
					)}

					<hr className="my-2 mx-8" />

					<h2 className="px-8 text-2xl font-bold">Members -</h2>

					<div className="px-8">
						{groupMembers && (
							<ol className="max-h-60 overflow-y-scroll py-4">
								{groupMembers.map((member, index) => {
									return (
										<li className="grid grid-cols-4 gap-4 items-center py-1" key={index} name={member.userId}>
											<p className="col-span-1">{member.userName}</p>
											<p className="col-span-1">{member.userPhone}</p>
											<p className="col-span-1 capitalize">{member.memberType}</p>
											{member.memberType !== "owner" && (
												<div className="col-span-1 flex justify-between">
													<button
														className={` rounded-md text-white  px-2 py-1 ${
															member.memberType === "admin" ? "bg-orange-500/80" : "bg-blue-500/80"
														}`}
														onClick={member.memberType === "admin" ? demoteFromAdmin : promoteToAdmin}
													>
														{member.memberType === "admin" ? "Revoke Admin" : "Admin Access"}
													</button>
													<button className="bg-red-500/80 rounded-md text-white  px-2 py-1" onClick={removeMember}>
														Remove
													</button>
												</div>
											)}
										</li>
									);
								})}
							</ol>
						)}
					</div>

					<hr className="my-2 mx-8" />

					<div className="flex justify-center items-center pt-2">
						<button className="bg-red-500/80 rounded-md text-white px-2 py-1" onClick={leaveGroup}>
							Leave Group
						</button>
					</div>
				</div>
			)}
		</>
	);
}
