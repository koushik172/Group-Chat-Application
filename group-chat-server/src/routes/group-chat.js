import express from "express";

import { Verify_user } from "../middlewares/verify_user.js";
import * as groupChatController from "../controllers/group-chat.js";

const groupChatRouter = express.Router();

groupChatRouter.post("/send-message", Verify_user, groupChatController.sendMessage);

groupChatRouter.get("/get-message/:groupId/:groupChatId", Verify_user, groupChatController.getMessage);

export default groupChatRouter;
