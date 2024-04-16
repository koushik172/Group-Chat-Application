import { CronJob } from "cron";
import { Op } from "sequelize";

import Chat from "../models/chat.js";
import GroupChat from "../models/group-chat.js";

const job = new CronJob(
	"0 * * * * *", // cronTime
	async function () {
		let date = new Date();
		let startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);
		let endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

		await Chat.destroy({
			where: {
				createdAt: {
					[Op.between]: [startDate, endDate],
				},
			},
		});

		await GroupChat.destroy({
			where: {
				createdAt: {
					[Op.between]: [startDate, endDate],
				},
			},
		});
	}, // onTick
	null, // onComplete
	true // start
);

export default job;
