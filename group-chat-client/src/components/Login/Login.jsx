import React, { useState, useEffect } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
	const [formData, setFormData] = useState({ email: "", password: "" });

	const navigate = useNavigate();

	function handleChange(e) {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	}

	async function handleSubmit() {
		try {
			let res = await axios.post(`http://${import.meta.env.VITE_SERVER_IP}/user/login`, formData);
			localStorage.setItem("Username", res.data.username);
			localStorage.setItem("Token", res.data.token);
			if (res.status === 200) navigate("/");
		} catch (error) {
			console.log(error.response.data);
		}
	}

	useEffect(() => {	
		document.title = "Chat app - Login";
	}, []);

	return (
		<div className="h-screen bg-blue-950 flex flex-col justify-center items-center ">
			<div className="bg-slate-300 p-5 flex flex-col items-center space-y-6 rounded-xl pt-8">
				<div className="flex flex-col space-y-4 w-full">
					<div className="flex justify-between space-x-4 items-center">
						<label className="font-semibold" htmlFor="email">
							Email
						</label>
						<input className="p-1 rounded-md" name="email" type="email" onChange={handleChange} value={formData.email} />
					</div>

					<div className="flex justify-between space-x-4 items-center">
						<label className="font-semibold" htmlFor="password">
							Password
						</label>
						<input className="p-1 rounded-md" name="password" type="password" onChange={handleChange} value={formData.password} />
					</div>
				</div>
				<div className="flex flex-col justify-center items-center">
					<button className="bg-green-500 py-2 px-4 rounded-lg text-gray-800 font-bold" onClick={handleSubmit}>
						Login
					</button>
					<p className="pt-2">
						New User.{" "}
						<a href="/signup" className="underline">
							Sign Up
						</a>
					</p>
				</div>
			</div>
		</div>
	);
}
