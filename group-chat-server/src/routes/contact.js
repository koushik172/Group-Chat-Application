import express from "express";

import { Verify_user } from "../middlewares/verify_user.js";
import * as contactController from "../controllers/contact.js";

const contactRouter = express.Router();

contactRouter.post("/add-contact", Verify_user, contactController.addContact);

contactRouter.get("/get-contacts", Verify_user, contactController.getContacts);

export default contactRouter;
