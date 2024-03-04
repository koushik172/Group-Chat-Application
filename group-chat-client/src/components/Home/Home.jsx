import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ContactProvider } from "../Context/ContactContext";

import AllContact from "./AllContact/AllContacts";
import Chat from "./Chat";

export default function Home() {
	const navigate = useNavigate();

	useEffect(() => {
		if (!localStorage.getItem("Token")) {
			navigate("/login");
		}
	}, []);

	return (
		<ContactProvider>
			<div className="h-screen bg-gradient-to-b from-blue-700 to bg-orange-500 to flex">
				<div className="p-10 flex flex-col w-full">
					<p className="py-2 mb-4 flex justify-center items-center text-4xl font-semibold text-slate-300 bg-indigo-50/30 rounded-md backdrop-blur-md">
						Chat App
					</p>
					<div className="flex bg-indigo-50/30 w-full h-full rounded-md overflow-y-scroll">
						{/* CHATLOG */}
						<AllContact />

						{/* CHATBOX */}
						<Chat />
					</div>
				</div>
			</div>
		</ContactProvider>
	);
}
