import express from "express";

import { Verify_user } from "../middlewares/verify_user.js";
import * as groupController from "../controllers/group.js";

const groupRouter = express.Router();

groupRouter.post("/create-group", Verify_user, groupController.createGroup);

groupRouter.post("/join-group", Verify_user, groupController.joinGroup);

export default groupRouter;
