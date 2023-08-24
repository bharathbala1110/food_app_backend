const { OrderModel, OrderStatus } = require("../models/order.model");
const auth = require("../middlewares/auth.mid");

const express = require("express");
// const { isValidObjectId } = require("mongoose");
const router = express.Router();
router.use(auth);

router.post("/create", async (req, res) => {
	try {
		const requestOrder = req.body;
		console.log("requestOrder", requestOrder);
		// return;
		if (requestOrder.items.length <= 0) {
			res.status(400).send("Cart is Empty");
		}

		await OrderModel.deleteOne({
			user: req.user.id,
			status: OrderStatus.NEW,
		});
		console.log("user_id", req.user.id);

		const newOrder = new OrderModel({
			...requestOrder,
			user: req.user.id,
		});
		console.log("newOrder", newOrder);

		await newOrder.save();
		res.status(200).send(newOrder);
	} catch (error) {
		console.log(error);
		res.status(400).send("Error creating order");
	}
});
router.get("/newOrderForCurrentUser", async (req, res) => {
	console.log("order");

	const order = await getNewOrderForCurrentUser(req);

	if (order) res.send(order);
	else res.status(401).send();
});
router.post("/pay", async (req, res) => {
	const { paymentId } = req.body;
	const order = await getNewOrderForCurrentUser(req);
	if (!order) {
		res.status(401).send("Order Not Found!");
		return;
	}

	order.paymentId = paymentId;
	order.status = OrderStatus.PAYED;
	await order.save();

	res.send(order._id);
});
router.get("/track/:id", async (req, res) => {
	const order = await OrderModel.findById(req.params.id);
	res.send(order);
});
async function getNewOrderForCurrentUser(req) {
	return await OrderModel.findOne({
		user: req.user.id,
		status: OrderStatus.NEW,
	});
}
module.exports = router;
