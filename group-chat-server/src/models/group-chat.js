import Sequelize from "sequelize";

import sequelize from "../utils/database.js";

const GroupChat = sequelize.define("group-chats", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	senderId: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	senderName: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	groupId: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	message: {
		type: Sequelize.STRING,
		allowNull: false,
	},
});

export default GroupChat;
