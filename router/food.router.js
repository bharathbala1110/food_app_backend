const { sample_foods, sample_tags } = require("../data");
const { FoodModel } = require("../models/food.model");
const express = require("express");
const router = express.Router();

router.get("/seed", async (req, res) => {
	const foodCount = await FoodModel.countDocuments();

	if (foodCount > 0) {
		res.send("seed is already done");
		return;
	}
	await FoodModel.create(sample_foods);
	res.send("Seed is done");
});
router.get("/tags", (req, res) => {
	res.send(sample_tags);
});
router.get("/tag/:tagName", (req, res) => {
	const tagName = req.params.tagName;
	const foods = sample_foods.filter((food) => food.tags?.includes(tagName));
	res.send(foods);
});
router.get("/", async (req, res) => {
	console.log("foods");

	try {
		const foods = await FoodModel.find();
		res.status(200).send(foods);
	} catch (error) {
		res.status(400).send(error);
	}
});

router.get("/search/:searchTerm", async (req, res) => {
	try {
		const searchTerm = new RegExp(req.params.searchTerm, "i");
		const foods = await FoodModel.find({ name: { $regex: searchTerm } });
		res.status(200).send(foods);
	} catch (error) {
		res.status(400).send(error);
	}
});

router.get("/:foodId", async (req, res) => {
	try {
		const foodId = req.params.foodId;

		const food = await FoodModel.findById(req.params.foodId);
		res.status(200).send(food);
	} catch (error) {
		res.status(400).send(error);
	}
});
module.exports = router;
