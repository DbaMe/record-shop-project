import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

import ordersRouter from "./routes/orders.js";
import recordsRouter from "./routes/records.js";
import usersRouter from "./routes/users.js";

const app = express();
dotenv.config();

app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

/** SETTING UP LOWDB */
// lowdb
import { join, dirname } from "path";
import { Low, JSONFile } from "lowdb";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Use JSON file for storage
const file = join(__dirname, "db.json");
const adapter = new JSONFile(file);
const db = new Low(adapter);

await db.read();

db.data ||= { records: [], users: [], orders: [] };

// Read data from JSON file, this will set db.data content
app.get("/api/records", async (req, res, next) => {
	const { records } = db.data;

	res.send(records);
});

// Create data to JSON file
app.post("/api/records", async (req, res) => {
	const { records } = db.data;
	records.push({ ...req.body, id: Date.now().toString() });
	await db.write();
	res.send(records);
});

// ROUTES

app.use("/orders", ordersRouter);
app.use("/records", recordsRouter);
app.use("/users", usersRouter);

// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});


const port = process.env.PORT || 8080;
app.listen(port, () => console.log("Server is running on port:", port));








// const express = require("express");
// const app = express();
// app.use(express.json());

// const low = require("lowdb");
// const FileSync = require("lowdb/adapters/FileSync");
// const adapter = new FileSync("db.json");
// const db = low(adapter);

// // db.defaults({ records: [{}]}).write()

// app.get("/records", (req, res) => {
// 	const records = db.get("records").value();
// 	res.json(records);
// });
// app.post("/records", (req, res) => {
// 	console.log(req.body);
// 	if (req.body.length) {
// 		db.get("records").push(req.body).write();
// 		res.json({ message: "record added into  database", success: true });
// 	} else {
// 		res.json({ message: "record coudnt added into  database", success: false });
// 	}
// });

// app.listen(3000, () => console.log("server is running"));



// const express = require("express");
// const app = express();
// app.use(express.json());

// const low = require("lowdb");
// const FileSync = require("lowdb/adapters/FileSync");

// const adapter = new FileSync("db.json");
// const db = low(adapter);

// /*  // Set some defaults
// db.defaults({ posts: [], user: {} })
//   .write()
//  */

// app.get("/api/records", (req, res) => {
// 	console.log("server home here");
// 	const records = db.get("records").value();
// 	res.json(records);
// });

// app.post("/api/records", (req, res) => {
// 	db.get("records").push(req.body).write();
// 	res.send("data saved in database");
// });

// app.listen(3000, () => console.log("server is running"));