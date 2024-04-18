import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ContactProvider } from "../Context/ContactContext";

import Profile from "./Profile/Profile";
import AllContact from "./AllContact/AllContacts";
import ChatBox from "./ChatBox/ChatBox";

export default function Home() {
	const navigate = useNavigate();

	const [openProfile, setOpenProfile] = useState(false);

	function logout() {
		localStorage.clear();
		navigate("/login");
	}

	function toogleProfile() {
		setOpenProfile(!openProfile);
		console.log(openProfile);
	}

	useEffect(() => {
		if (!localStorage.getItem("Token")) {
			navigate("/login");
		}
		document.title = "Chat App - Home";
	}, []);

	return (
		<ContactProvider>
			<div className="h-screen bg-gradient-to-b from-blue-600 to bg-orange-600 to flex">
				<div className="p-2 flex flex-col w-full">
					<div className="py-2 px-8 mb-2 flex justify-between items-center text-4xl font-semibold text-slate-300 bg-gray-800/60 rounded-sm backdrop-blur-md">
						<p>Chat App</p>
						<div className="flex gap-4">
							<button className="text-base text-slate-200 bg-blue-500/80 px-3 py-1 rounded-md" onClick={toogleProfile}>
								<i className="fa-regular fa-user"></i>
							</button>
							<button className="text-base text-slate-200 bg-red-500/80 px-2 py-1 rounded-md" onClick={logout}>
								<i className="fa-solid fa-right-from-bracket"></i>
							</button>
						</div>
					</div>

					{openProfile ? (
						<div className="flex bg-gray-900/50 w-full h-full rounded-sm overflow-y-scroll">
							<Profile />
						</div>
					) : (
						<div className="flex bg-gray-900/50 w-full h-full rounded-sm overflow-y-scroll">
							{/* CHATLOG */}
							<AllContact />

							{/* CHATBOX */}
							<ChatBox />
						</div>
					)}
				</div>
			</div>
		</ContactProvider>
	);
}
