import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Signup() {
	const [formData, setFormData] = useState({ name: "", email: "", phone: "", password: "" });

	function handleChange(e) {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	}

	async function handleSubmit() {
		try {
			let res = await axios.post(`http://${import.meta.env.VITE_SERVER_IP}/user/signup`, formData);
			alert(res.data.Message);
			console.log(res.data.Message);
		} catch (error) {
			alert(error.response.data.Message);
			console.log(error.response.data.Message);
		}
	}

	useEffect(() => {
		document.title = "Chat app - Sign Up";
	}, []);

	return (
		<div className="h-screen bg-blue-950 flex flex-col justify-center items-center ">
			<div className="bg-slate-300 p-5 flex flex-col items-center space-y-6 rounded-xl pt-8">
				<div className="flex flex-col space-y-4">
					<div className="flex justify-between space-x-4 items-center">
						<label className="font-semibold" htmlFor="name">
							Name
						</label>
						<input className="p-1 rounded-md" name="name" type="text" onChange={handleChange} value={formData.name} />
					</div>
					<div className="flex justify-between space-x-4 items-center">
						<label className="font-semibold" htmlFor="email">
							Email
						</label>
						<input className="p-1 rounded-md" name="email" type="email" onChange={handleChange} value={formData.email} />
					</div>
					<div className="flex justify-between space-x-4 items-center">
						<label className="font-semibold" htmlFor="phone">
							Phone
						</label>
						<input className="p-1 rounded-md" name="phone" type="number" onChange={handleChange} value={formData.phone} />
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
						Sign up
					</button>
					<p className="pt-2">
						Have an account.{" "}
						<a href="#" className="underline">
							Login
						</a>
					</p>
				</div>
			</div>
		</div>
	);
}
