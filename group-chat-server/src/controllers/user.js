import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import sequelize from "../utils/database.js";
import User from "../models/user.js";

export const signup = async (req, res) => {
	const transaction = await sequelize.transaction();
	const { name, email, password, phone } = req.body;
	console.log(req.body);
	let hash;

	try {
		hash = await bcrypt.hash(password, 5);
	} catch (err) {
		console.log(err);
		res.status(500).json({ Message: "Unknown Error" });
		return;
	}

	try {
		await User.create(
			{
				name: name,
				email: email,
				password: hash,
				phone: phone,
			},
			{ transaction: transaction }
		);
		res.status(201).json({ Message: "User Created Sucessfully." });
		await transaction.commit();
	} catch (error) {
		console.log(error);
		res.status(409).json({ Message: "Email or phone is already in use." });
		await transaction.rollback();
	}
};

export const login = async (req, res) => {
	const { email, password } = req.body;
	User.findOne({ where: { email: email } })
		.then(async (result) => {
			// password get a binay value to see if it is correct.
			let compare_password = await bcrypt.compare(password, result.password);
			if (compare_password) {
				const token = jwt.sign({ username: result.name, userId: result.id }, process.env.JWT_SECRET_KEY);
				res.status(200).json({
					Messege: "Login Sucessful",
					id: result.id,
					username: result.name,
					token: token,
				});
			} else {
				res.status(401).send({ Messege: "Wrong Password" });
			}
		})
		.catch((error) => {
			console.log(error);
			res.status(404).send({ Messege: "User Not Found" });
		});
};

export const getInfo = async (req, res) => {
	let user = await User.findOne({ where: { id: req.body.user2Id } });

	if (user) {
		res.status(200).send({ name: user.name, phone: user.phone, email: user.email });
	} else {
		res.status(404).send("NOT FOUND");
	}
};

export const updateInfo = async (req, res) => {
	const { name, value } = req.body.updateInfo;
	console.log(name, value);

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;

	if (!emailRegex.test(value) && !phoneRegex.test(value)) {
		res.status(400).send("Invalid email or phone.");
		return;
	} else {
		let alreadyExists = await User.findOne({ where: { [name]: value } });

		if (alreadyExists) {
			console.log(alreadyExists);
			res.status(400).send("Already taken");
			return;
		}

		if (req.user[name] !== value) {
			req.user[name] = value;
			req.user.save();
			res.status(201).send("Update Successfull.");
			return;
		}
		res.status(400).send("Invalid data.");
	}
};
