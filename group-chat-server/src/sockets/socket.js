import { Server } from "socket.io";

import jwt from "jsonwebtoken";

import User from "../models/user.js";
import Chat from "../models/chat.js";
import GroupChat from "../models/group-chat.js";

let io;

let users = new Map();
let groups = new Map();
let userGroups = new Map();

export const startChatIoServer = (httpServer) => {
	io = new Server(httpServer, {
		cors: {
			origin: "*",
			methods: ["GET", "POST"],
		},
	});

	io.use(async (socket, next) => {
		try {
			const token = socket.handshake.query.token;
			const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
			const user = await User.findOne({ where: { id: decoded.userId } });

			if (!user) {
				return next(new Error("Authentication error"));
			}

			socket.user = user;
			next();
		} catch (error) {
			console.log(error);
			next(new Error("Authentication error"));
		}
	});

	io.on("connection", (socket) => {
		users.set(JSON.stringify(socket.user.id), socket.id);
		console.log(`Client Connected: ${socket.id}`);

		// CONNECTION FOR PERSONAL CHATS
		socket.on("send-message", async ({ chatData, message, type }) => {
			try {
				let savedMessage = await Chat.create({
					senderId: socket.user.id,
					receiverId: chatData.user2Id,
					type: type,
					message: message,
					contactId: chatData.contactId,
				});

				socket.emit("message", savedMessage);

				if (users.has(chatData.user2Id)) {
					socket.to(users.get(chatData.user2Id)).emit("message", savedMessage);
				}
			} catch (error) {
				console.log(error);
			}
		});

		// CONNECTION FOR GROUP CHATS
		socket.on("joinGroup", ({ groupId }) => {
			socket.join(groupId);

			// Add the user to the group in the groups Map
			if (groups.has(groupId)) {
				let usersInGroup = groups.get(groupId);
				usersInGroup.add(socket.user.id);
				groups.set(groupId, usersInGroup);
			} else {
				groups.set(groupId, new Set([socket.user.id]));
			}

			if (!userGroups.has(socket.user.id)) {
				userGroups.set(socket.user.id, new Set());
			}
			
			userGroups.get(socket.user.id).add(groupId);

			console.log(`User ${socket.user.id} joined group ${groupId}`);
		});

		socket.on("sendGroupMessage", async ({ groupId, message, type }) => {
			try {
				let savedMessage = await GroupChat.create({
					senderId: socket.user.id,
					senderName: socket.user.name,
					groupId: groupId,
					type: type,
					message: message,
				});

				io.to(groupId).emit("groupMessage", savedMessage);
			} catch (error) {
				console.log(error);
			}
		});
		
		socket.on("disconnect", () => {
			if (userGroups.has(socket.user.id)) {
				let groupsToLeave = userGroups.get(socket.user.id);

				for (let groupId of groupsToLeave) {
					socket.leave(groupId);

					if (groups.has(groupId)) {
						let usersInGroup = groups.get(groupId);
						usersInGroup.delete(socket.user.id);

						// If no users are left in the group, delete the group
						if (usersInGroup.size === 0) {
							groups.delete(groupId);
						} else {
							groups.set(groupId, usersInGroup);
						}
					}

					console.log(`User ${socket.user.id} left group ${groupId}`);
				}
				userGroups.delete(socket.user.id);
			}

			users.delete(socket.user.id);
			console.log(`Client disconnected: ${socket.id}`);
		});
	});
};
