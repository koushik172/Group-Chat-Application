import User from "../models/user.js";
import Contact from "../models/contact.js";

import { Op } from "sequelize";

export const addContact = async (req, res) => {
	if (parseInt(req.user.phone) === parseInt(req.body.contact_number)) {
		res.status(201).send("Invalid Contact Number.");
		return;
	}

	try {
		const contact_user = await User.findOne({ where: { phone: req.body.contact_number } });
		if (contact_user === null) {
			res.status(201).send("No contact found.");
			return;
		}
		try {
			await Contact.create({
				user1Id: req.user.id,
				user2Id: contact_user.id,
				user1Name: req.user.name,
				user2Name: contact_user.name,
			});
			res.status(200).send("Contact Added Successfully");
			return;
		} catch (error) {
			console.log(error);
			res.status(200).send("Duplicate Contact.");
			return;
		}
	} catch (error) {
		console.log(error);
		res.status(500).send("Internal Error");
	}
};

export const getContacts = async (req, res) => {
	try {
		const conatcts = await Contact.findAll({
			where: { [Op.or]: [{ user1Id: req.user.id }, { user2Id: req.user.id }] },
		});
		res.send({ Contacts: conatcts });
		return;
	} catch (error) {
		console.log(error);
		res.send("Internal Error");
	}
};
