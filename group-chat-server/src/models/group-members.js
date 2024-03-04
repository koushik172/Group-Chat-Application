import Sequelize from "sequelize";

import sequelize from "../utils/database.js";

const GroupMember = sequelize.define(
	"groups-members",
	{
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		groupId: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		groupName: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		userId: {
			type: Sequelize.STRING,
			allowNull: false,
		},
	},
	{
		indexes: [
			{
				unique: true,
				fields: ["groupId", "userId"],
			},
		],
	}
);

export default GroupMember;
