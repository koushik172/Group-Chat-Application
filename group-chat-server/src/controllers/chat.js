import sequelize from "../utils/database.js";
import Contact from "../models/contact.js";
import Chat from "../models/chat.js";

export const sendMessage = async (req, res) => {
	try {
		await Chat.create({
			senderId: req.user.id,
			receiverId: req.body.receiverId,
			message: req.body.message,
		});
		res.status(200).send("Message sent");
		return;
	} catch (error) {
		console.log(error);
		res.status(200).send("Unknown Error");
		return;
	}
};

export const getChat = async (req, res) => {};
