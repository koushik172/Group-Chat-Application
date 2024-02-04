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
		contactId: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		contactNumber: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		contactName: {
			type: Sequelize.STRING,
			allowNull: false,
		},
	},
	{
		indexes: [
			{
				unique: true,
				fields: ["userId", "contactId"],
			},
		],
	}
);

export default Contact;
