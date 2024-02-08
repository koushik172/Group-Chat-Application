import sequelize from "../utils/database.js";
import Chat from "../models/chat.js";

export const sendMessage = async (req, res) => {
	try {
		await Chat.create({
			senderId: req.user.id,
			receiverId: req.body.receiverId,
			message: req.body.message,
			contactId: req.body.contactId,
		});
		res.status(200).send("Message sent");
		return;
	} catch (error) {
		res.status(200).send("Unknown Error");
		return;
	}
};

export const getMessage = async (req, res) => {
	try {
		let messages = await Chat.findAll({ where: { contactId: req.params.contactId } });

		if (messages.length < 1) {
			res.status(200).send("No Messages");
			return;
		}

		if (req.user.id === parseInt(messages[0].senderId) || req.user.id === parseInt(messages[0].receiverId)) {
			console.log(messages[0].senderId);
			res.status(200).send(messages);
			return;
		}
	} catch (error) {
		console.log(error);
		res.status(404).send("Unknown error");
	}
};
