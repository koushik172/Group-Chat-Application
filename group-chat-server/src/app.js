import http from "http";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";


import { startChatIoServer } from "./sockets/socket.js";
import sequelize from "./utils/database.js";

import Contact from "./models/contact.js";
import Chat from "./models/chat.js";

import userRouter from "./routes/user.js";
import contactRouter from "./routes/contact.js";
import chatRouter from "./routes/chat.js";
import groupRouter from "./routes/group.js";
import groupChatRouter from "./routes/group-chat.js";
import manageGroupRouter from "./routes/manage-group.js";

const app = express();
const httpServer = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({ origin: "http://localhost:5173", methods: ["GET", "POST"] }));

Contact.hasMany(Chat);
Chat.belongsTo(Contact);

app.use("/user", userRouter);
app.use("/contact", contactRouter);
app.use("/chat", chatRouter);
app.use("/group", groupRouter);
app.use("/group-chat", groupChatRouter);
app.use("/manage-group", manageGroupRouter);

await sequelize
	.sync()
	.then(() => {
		httpServer.listen(process.env.PORT, () => {
			console.log(`http://localhost:${process.env.PORT}`);
			startChatIoServer(httpServer);
		});
	})
	.catch((err) => {
		console.log(err);
	});
