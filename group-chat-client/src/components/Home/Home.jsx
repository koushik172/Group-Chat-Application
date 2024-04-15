import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ContactProvider } from "../Context/ContactContext";

import AllContact from "./AllContact/AllContacts";
import ChatBox from "./ChatBox/ChatBox";

export default function Home() {
	const navigate = useNavigate();

	function logout() {
		localStorage.clear();
		navigate("/login");
	}

	useEffect(() => {
		if (!localStorage.getItem("Token")) {
			navigate("/login");
		}
		document.title = "Chat App - Home";
	}, []);

	return (
		<ContactProvider>
			<div className="h-screen bg-gradient-to-b from-blue-700 to bg-orange-500 to flex">
				<div className="p-2 flex flex-col w-full">
					<div className="py-2 px-8 mb-4 flex justify-between items-center text-4xl font-semibold text-slate-300 bg-indigo-50/30 rounded-sm backdrop-blur-md">
						<p>Chat App</p>
						<button className="text-base text-slate-200 bg-red-500/80 px-2 py-1 rounded-md" onClick={logout}>
							Logout
						</button>
					</div>
					<div className="flex bg-indigo-50/30 w-full h-full rounded-sm overflow-y-scroll">
						{/* CHATLOG */}
						<AllContact />

						{/* CHATBOX */}
						<ChatBox />
					</div>
				</div>
			</div>
		</ContactProvider>
	);
}
