import express from "express";
const router = express.Router();

import {
	addOrder,
	deleteOrder,
	getOrder,
	getOrders,
	updateOrder,
} from "../controllers/ordersController.js";

router.route("/")
	.get(getOrders) // Get all ORDERS from the database / resources
	.post(addOrder); // POST Request  to add a new ORDER 

router.route("/:id")
	.get(getOrder) // GET single Request to get a specific ORDER by ID
	.delete(deleteOrder) // DELETE single Request to delete a specific ORDER by ID
	.put(updateOrder); // PUT single Request to update a specific ORDER by ID


// DEFAULT EXPORT

export default router;
