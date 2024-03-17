import Group from "../models/group.js";
import GroupMember from "../models/group-members.js";

export const createGroup = async (req, res) => {
	try {
		let group = await Group.create({ groupName: req.body.groupName, ownerId: req.user.id });
		await GroupMember.create({
			groupId: group.id,
			groupName: group.groupName,
			userId: req.user.id,
			userName: req.user.name,
			userPhone: req.user.phone,
			memberType: "owner",
		});
		console.log(group);
		res.status(300).send("Group Created Sucessfully");
	} catch (error) {
		console.log(error);
		res.status(200).send("Unsucessfull");
	}
};

export const joinGroup = async (req, res) => {
	console.log(req.body);
	try {
		let group = await Group.findOne({ where: { id: req.body.groupId } });

		if (!group) {
			res.status(404).send("No such group.");
			return;
		}

		if (parseInt(req.user.id) === parseInt(group.ownerId)) {
			res.status(400).send("Not Allowed");
			return;
		}

		let result = await GroupMember.create({
			groupId: group.id,
			groupName: group.groupName,
			userId: req.user.id,
			userName: req.user.name,
			userPhone: req.user.phone,
		});
		console.log(result);

		res.status(200).send("Group Joined.");
	} catch (error) {
		console.log(error);
		res.status(400).send("Request Unsucessfull.");
	}
};

export const getGroups = async (req, res) => {
	try {
		let memberGroups = await GroupMember.findAll({ where: { userId: req.user.id }, attributes: ["groupId", "groupName"] });
		res.send({ memberGroups: memberGroups });
	} catch (error) {
		console.log(error);
		res.send("Error");
	}
};
