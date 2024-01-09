import express from "express";

import * as userController from "../controllers/user.js";

const userRouter = express.Router();

userRouter.post("/signup", userController.signup);

export default userRouter;
