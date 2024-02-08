import jwt from "jsonwebtoken";

import User from "../models/user.js";

export const Verify_user = async (req, res, next) => {
	let token = req.headers.authorization;
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
		req.user = await User.findOne({ where: { id: decoded.userId } });
		if (req.user) {
			next();
			return;
		}
		res.status(404).send("Error! Not Found.");
		return;
	} catch (error) {
		console.log(error);
		res.status(401).json("Unauthorised");
	}
};
