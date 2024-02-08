import Sequelize from "sequelize";

import sequelize from "../utils/database.js";

const Contact = sequelize.define(
	"contacts",
	{
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		user1Id: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		user2Id: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		user1Name: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		user2Name: {
			type: Sequelize.STRING,
			allowNull: false,
		},
	},
	{
		indexes: [
			{
				unique: true,
				fields: ["user1Id", "user2Id"],
			},
		],
	}
);

export default Contact;
