import Sequelize from "sequelize";

import sequelize from "../utils/database.js";

const Chat = sequelize.define("chats", {
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
	receiverId: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	message: {
		type: Sequelize.STRING,
		allowNull: false,
	},
});

export default Chat;
