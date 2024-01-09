import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import sequelize from "./utils/database.js";

import userRouter from "./routes/user.js";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({ origin: "http://localhost:5173", methods: ["GET", "POST"] }));

app.use("/user", userRouter);

await sequelize
	.sync()
	.then(() => {
		app.listen(process.env.PORT, () => {
			console.log(`http://localhost:${process.env.PORT}`);
		});
	})
	.catch((err) => {
		console.log(err);
	});
