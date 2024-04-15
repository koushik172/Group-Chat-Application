import express from "express";

import { Verify_user } from "../middlewares/verify_user.js";
import upload from "../middlewares/upload.js";

import * as uploadController from "../controllers/upload.js";

const uploadRouter = express.Router();

uploadRouter.post("/upload", Verify_user, upload.single("file"), uploadController.uploadFile);

export default uploadRouter;
