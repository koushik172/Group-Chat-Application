import express from "express";

import { Verify_user } from "../middlewares/verify_user.js";
import * as chatController from "../controllers/chat.js";

const chatRouter = express.Router();

chatRouter.post("/send-message", Verify_user, chatController.sendMessage);

chatRouter.get("/get-message/:contactId", Verify_user, chatController.getMessage);

export default chatRouter;
