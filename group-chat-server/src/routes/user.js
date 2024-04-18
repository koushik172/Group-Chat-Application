import express from "express";

import * as userController from "../controllers/user.js";

import { Verify_user } from "../middlewares/verify_user.js";

const userRouter = express.Router();

userRouter.post("/signup", userController.signup);

userRouter.post("/login", userController.login);

userRouter.post("/user-info", Verify_user, userController.getInfo);

userRouter.post("/update-info", Verify_user, userController.updateInfo);

export default userRouter;
