import User from "../models/user.js";
import Group from "../models/group.js";
import GroupMember from "../models/group-members.js";

import { Op } from "sequelize";

export const getMembers = async (req, res) => {
	try {
		let members = await GroupMember.findAll({ where: { groupId: req.params.groupId } });
		res.status(200).send({ Members: members });
	} catch (error) {
		console.log(error);
		res.status(200).send("Error Fetching Members");
	}
};

export const searchUser = async (req, res) => {
	let userInfo = req.params.userInfo;
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
	let infoType;

	if (emailRegex.test(userInfo)) {
		infoType = "email";
	} else if (phoneRegex.test(userInfo)) {
		infoType = "phone";
	} else {
		infoType = "invalid";
	}

	try {
		let user = await User.findOne({ where: { [infoType]: userInfo } });
		res.status(200).send({ id: user.id, name: user.name, email: user.email, phone: user.phone });
	} catch (error) {
		console.log(error);
		res.status(500).send("Unknown Error");
	}
};

export const addMember = async (req, res) => {
	const group = req.body.groupData;
	const member = req.body.newMemberData;

	try {
		await GroupMember.create({
			groupId: group.groupId,
			groupName: group.groupName,
			userId: member.id,
			userName: member.name,
			userPhone: member.phone,
		});
		res.status(200).send("User added Sucessfully");
	} catch (error) {
		res.status(200).send("Invalid Request");
	}
};

export const removeMember = async (req, res) => {
	let currentUserAccess = await GroupMember.findOne({ where: { [Op.and]: [{ userId: req.user.id }, { groupId: req.params.groupId }] } });

	if (!currentUserAccess) {
		res.status(404).send("Invalid Request");
	}

	try {
		let member = await GroupMember.findOne({ where: { [Op.and]: [{ userId: req.params.memberId }, { groupId: req.params.groupId }] } });

		if (!member) {
			res.status(404).send("Invalid Request");
		}

		if (currentUserAccess.memberType === "owner") {
			member.destroy();
			res.status(200).send("Removed");
		} else if (currentUserAccess.memberType === "admin" && member.memberType === "member") {
			member.destroy();
			res.status(200).send("Removed");
		} else {
			res.status(200).send("Unauthorized");
		}
	} catch (error) {
		console.log(error);
		res.status(200).send("Request Unsuccessfull");
	}
};

export const promoteToAdmin = async (req, res) => {
	const { groupId, memberId } = req.body;

	let currentUserAccess = await GroupMember.findOne({ where: { [Op.and]: [{ userId: req.user.id }, { groupId: groupId }] } });

	if (!currentUserAccess) {
		res.status(404).send("Invalid Request");
	}

	try {
		if (currentUserAccess.memberType === "owner") {
			let member = await GroupMember.findOne({ where: { [Op.and]: [{ userId: memberId }, { groupId: groupId }] } });

			if (!member) {
				res.status(404).send("Invalid Request");
			} else {
				member.memberType = "admin";
				await member.save();
			}
			res.status(200).send("Promoted");
		} else {
			res.status(200).send("Unauthorised");
		}
	} catch (error) {
		res.status(500).send("Internal Error");
	}
};

export const demoteFromAdmin = async (req, res) => {
	const { groupId, memberId } = req.body;

	let currentUserAccess = await GroupMember.findOne({ where: { [Op.and]: [{ userId: req.user.id }, { groupId: groupId }] } });

	if (!currentUserAccess) {
		res.status(404).send("Invalid Request");
	}

	try {
		if (currentUserAccess.memberType === "owner") {
			let member = await GroupMember.findOne({ where: { [Op.and]: [{ userId: memberId }, { groupId: groupId }] } });

			if (!member) {
				res.status(404).send("Invalid Request");
			} else {
				member.memberType = "member"; 
				await member.save();
			}
			res.status(200).send("Demoted");
		} else {
			res.status(200).send("Unauthorised");
		}
	} catch (error) {
		res.status(500).send("Internal Error");
	}
};
