import sequelize from "../utils/database.js";
import Chat from "../models/chat.js";

import { Op } from "sequelize";

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
		let messages;
		if (parseInt(req.params.chatId) === 0) {
			messages = await Chat.findAll({ where: { contactId: req.params.contactId }, limit: 20, order: [["createdAt", "DESC"]] });
		} else {
			messages = await Chat.findAll({
				where: { [Op.and]: [{ contactId: req.params.contactId }, { id: { [Op.gt]: req.params.chatId } }] },
				limit: 20,
				order: [["createdAt", "DESC"]],
			});
		}

		if (messages.length < 1 || messages === undefined) {
			res.status(200).send([]);
			return;
		}

		if (req.user.id === parseInt(messages[0].senderId) || req.user.id === parseInt(messages[0].receiverId)) {
			res.status(200).send(messages);
			return;
		}
	} catch (error) {
		console.log(error);
		res.status(404).send("Unknown error");
	}
};
