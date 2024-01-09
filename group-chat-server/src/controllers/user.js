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
