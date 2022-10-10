import express from "express";
const router = express.Router();
import {
	addRecord,
	deleteRecord,
	getRecord,
	getRecords,
	updateRecord,
} from "../controllers/recordsController.js";

router
	.route("/") //  Get all ORDERS from the database / resources
	.get(getRecords)
	.post(addRecord);

router.route("/:id")
	.get(getRecord)
	.delete(deleteRecord)
	.put(updateRecord);

export default router;
