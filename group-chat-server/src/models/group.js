import Sequelize from "sequelize";

import sequelize from "../utils/database.js";

const Group = sequelize.define(
	"groups",
	{
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		groupName: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		ownerId: {
			type: Sequelize.STRING,
			allowNull: false,
		}
	},
	{
		indexes: [
			{
				unique: true,
				fields: ["groupName", "ownerId"],
			},
		],
	}
);

export default Group;
