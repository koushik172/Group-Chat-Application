import React, { useEffect, useState } from "react";

import axios from "axios";

import { useContactContext } from "../../../Context/ContactContext";

export default function ManageMenu() {
	const { currentChat } = useContactContext();

	const [userInfo, setUserInfo] = useState({});

	async function getUserInfo() {
		let response = await axios.post(
			`http://${import.meta.env.VITE_SERVER_IP}/user/user-info`,
			{ user2Id: currentChat.user2Id },
			{
				headers: {
					Authorization: localStorage.getItem("Token"),
				},
			}
		);
		setUserInfo(response.data);
	}

	useEffect(() => {
		getUserInfo();
	}, [currentChat]);

	return (
		<>
			{/* Manage Menu */}
			{currentChat.user2Name && (
				<div className="bg-blue-700/40 w-full flex flex-col p-2 rounded-md font-semibold my-2 h-full">
					<div className="px-8 pt-4 ">
						<div className="flex  text-2xl py-1">
							<p className="whitespace-pre w-1/2 font-bold">USERNAME : </p>
							<p className="font-semibold">{userInfo.name}</p>
						</div>
						<div className="flex  text-2xl py-1">
							<p className="whitespace-pre w-1/2 font-bold">PHONE NO : </p>
							<p className="font-semibold">{userInfo.phone}</p>
						</div>
						<div className="flex  text-2xl py-1">
							<p className="whitespace-pre w-1/2 font-bold">EMAIL ID : </p>
							<p className="font-semibold">{userInfo.email}</p>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
