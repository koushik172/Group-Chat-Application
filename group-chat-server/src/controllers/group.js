import Group from "../models/group.js";

export const createGroup = async (req, res) => {
	res.send("Create group");
	console.log(req.body);
};

export const joinGroup = async (req, res) => {
	res.send("join group");
};
