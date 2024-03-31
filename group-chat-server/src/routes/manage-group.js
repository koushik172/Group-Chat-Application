import express from "express";

import { Verify_user } from "../middlewares/verify_user.js";
import * as manageGroupController from "../controllers/manage-group.js";

const manageGroupRouter = express.Router();

manageGroupRouter.get("/get-members/:groupId", Verify_user, manageGroupController.getMembers);

manageGroupRouter.get("/search-user/:userInfo", Verify_user, manageGroupController.searchUser);

manageGroupRouter.post("/add-member", Verify_user, manageGroupController.addMember);

manageGroupRouter.get("/remove-member/:groupId/:memberId", Verify_user, manageGroupController.removeMember);

manageGroupRouter.post("/promote-member", Verify_user, manageGroupController.promoteToAdmin);

manageGroupRouter.post("/demote-member", Verify_user, manageGroupController.demoteFromAdmin);

manageGroupRouter.post("/leave-group", Verify_user, manageGroupController.leaveGroup);

export default manageGroupRouter;
