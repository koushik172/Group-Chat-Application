import React, { useEffect, useState } from "react";

import axios from "axios";

export default function Profile() {
	const [userInfo, setUserInfo] = useState({});

	const [updateInfo, setUpdateInfo] = useState({ name: "", value: "" });

	const [updateMenu, setUpdateMenu] = useState("");

	async function getUserInfo() {
		let response = await axios.post(
			`http://${import.meta.env.VITE_SERVER_IP}/user/user-info`,
			{ user2Id: localStorage.getItem("UserId") },
			{
				headers: {
					Authorization: localStorage.getItem("Token"),
				},
			}
		);
		setUserInfo(response.data);
	}

	async function updateUserInfo(e) {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;

		if (!emailRegex.test(updateInfo.value) && !phoneRegex.test(updateInfo.value)) {
			alert("Invalid email or phone.");
			return;
		} else {
			try {
				let response = await axios.post(
					`http://${import.meta.env.VITE_SERVER_IP}/user/update-info`,
					{ updateInfo: updateInfo },
					{
						headers: {
							Authorization: localStorage.getItem("Token"),
						},
					}
				);
				console.log(response);
			} catch (error) {
				console.log(error);
				alert("Update Unsuccessfull");
			}
		}
	}

	function editClick(e) {
		setUpdateMenu(e.currentTarget.name);
		setUpdateInfo({ name: e.currentTarget.name, value: userInfo[e.currentTarget.name] });
	}

	function handleChange(e) {
		setUpdateInfo((prev) => ({ ...prev, value: e.target.value }));
	}

	useEffect(() => {
		getUserInfo();
	}, []);

	useEffect(() => {}, [updateInfo]);

	return (
		<>
			<div className="p-4 w-full h-full">
				<div className="bg-blue-500/40 w-full h-full rounded-md p-4 text-slate-200">
					<p className="text-3xl font-bold">PROFILE</p>

					<hr className="my-4" />

					{/* USER INFO */}
					<div className="flex flex-col gap-4 px-1">
						<div className="flex items-center text-2xl py-1">
							<p className="whitespace-pre w-1/3 font-bold">USERNAME : </p>
							<p className="font-semibold w-1/3">{userInfo.name}</p>
							{/* <button className="flex justify-end text-lg pe-4 w-1/3">
								<i className="fa-solid fa-pen-to-square px-4 py-2 bg-blue-600/70 hover:bg-blue-500/70 rounded-md"></i>
							</button> */}
						</div>

						<div className="flex items-center text-2xl py-1 ">
							<p className="whitespace-pre w-1/3  font-bold">PHONE NO : </p>
							<p className="font-semibold w-1/3">{userInfo.phone}</p>
							<button className="flex justify-end text-lg pe-4 w-1/3" name="phone" onClick={editClick}>
								<i className="fa-solid fa-pen-to-square px-4 py-2 bg-blue-600/70 hover:bg-blue-500/70 rounded-md"></i>
							</button>
						</div>

						<div className="flex items-center text-2xl py-1">
							<p className="whitespace-pre w-1/3 font-bold">EMAIL ID : </p>
							<p className="font-semibold w-1/3">{userInfo.email}</p>
							<button className="flex justify-end text-lg pe-4 w-1/3" name="email" onClick={editClick}>
								<i className="fa-solid fa-pen-to-square px-4 py-2 bg-blue-600/70 hover:bg-blue-500/70 rounded-md"></i>
							</button>
						</div>
					</div>

					<hr className="my-4" />

					{/* EMAIL UPDATE */}
					{updateMenu === "email" && (
						<div className="flex flex-col text-2xl py-4">
							<p className="whitespace-pre w-1/3 font-bold text-3xl">UPDATE EMAIL ID : </p>
							<div className="flex py-8">
								<p className="whitespace-pre w-1/3 font-bold">NEW EMAIL ID : </p>
								<input
									onChange={handleChange}
									placeholder={"New email"}
									value={updateInfo.value}
									className="font-semibold w-1/3 px-2 py-1 rounded-md text-slate-800"
								/>
								<button className="flex justify-end text-lg pe-4 w-1/3" name="email" onClick={updateUserInfo}>
									<i className="fa-solid fa-floppy-disk px-4 py-2 bg-blue-600/70 hover:bg-blue-500/70 rounded-md"></i>
								</button>
							</div>
						</div>
					)}

					{/* PHONE UPDATE */}
					{updateMenu === "phone" && (
						<div className="flex flex-col text-2xl py-4">
							<p className="whitespace-pre w-1/3 font-bold text-3xl">UPDATE PHONE NO : </p>
							<div className="flex py-8">
								<p className="whitespace-pre w-1/3 font-bold">NEW PHONE NO : </p>
								<input
									onChange={handleChange}
									placeholder={"New number"}
									value={updateInfo.value}
									className="font-semibold w-1/3 px-2 py-1 rounded-md text-slate-800"
								/>
								<button className="flex justify-end text-lg pe-4 w-1/3" name="email" onClick={updateUserInfo}>
									<i className="fa-solid fa-floppy-disk px-4 py-2 bg-blue-600/70 hover:bg-blue-500/70 rounded-md"></i>
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
