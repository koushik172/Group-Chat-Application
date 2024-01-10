import bcrypt from "bcrypt";

import sequelize from "../utils/database.js";
import User from "../models/user.js";

export const signup = async (req, res) => {
	const transaction = await sequelize.transaction();
	const { name, email, password, phone } = req.body;
	let hash;

	try {
		hash = await bcrypt.hash(password, 5);
	} catch (err) {
		console.log(err);
		res.status(500).json({ Message: "Unknown Error" });
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
				res.status(200).json({
					Messege: "Login Sucessful",
					username: result.name,
					premium: result.premium,
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
