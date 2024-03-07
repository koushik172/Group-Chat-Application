import GroupChat from "../models/group-chat.js";

import { Op } from "sequelize";

export const sendMessage = async (req, res) => {
	console.log(req.body);

	console.log({ senderId: req.user.id, senderName: req.user.name, groupId: req.body.groupId, message: req.body.message });

	try {
		await GroupChat.create({ senderId: req.user.id, senderName: req.user.name, groupId: req.body.groupId, message: req.body.message });
		res.status(200).send("Message Sent");
	} catch (error) {
		console.log(error);
		res.status(200).send("Error");
	}
};

export const getMessage = async (req, res) => {
	try {
		let messages;
		if (parseInt(req.params.groupChatId) === 0) {
			messages = await GroupChat.findAll({ where: { groupId: req.params.groupId }, limit: 20, order: [["createdAt", "DESC"]] });
		} else {
			messages = await GroupChat.findAll({
				where: { [Op.and]: [{ groupId: req.params.groupId }, { id: { [Op.gt]: req.params.groupChatId } }] },
				limit: 20,
				order: [["createdAt", "DESC"]],
			});
		}

		if (messages.length < 1 || messages === undefined) {
			res.status(200).send([]);
			return;
		}

		res.status(200).send(messages);
	} catch (error) {
		console.log(error);
		res.status(404).send("Unknown error");
	}
};
