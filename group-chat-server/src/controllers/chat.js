import sequelize from "../utils/database.js";
import Contact from "../models/contact.js";
import Chat from "../models/chat.js";

export const sendMessage = async (req, res) => {
	console.log(req.body, req.user);
	res.send("Sent");
};

export const getChat = async (req, res) => {};
