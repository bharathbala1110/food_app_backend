const { sample_user } = require("../data");
const jwt = require("jsonwebtoken");
const express = require("express");
const UserModel = require("../models/user.model");
const router = express.Router();

router.get("/seed", async (req, res) => {
	const userCount = await UserModel.countDocuments();

	if (userCount > 0) {
		res.send("seed is already done");
		return;
	}
	await UserModel.create(sample_user);
	res.send("Seed is done");
});
router.post("/register", async (req, res) => {
	const { name, email, password, address } = req.body;
	const user = await UserModel.findOne({ email });
	if (user) {
		res.status(400).send("Email is Already Registered");
	}
	const newUser = {
		name,
		email: email,
		password,
		address,
		isAdmin: false,
	};
	const dbUser = await UserModel.create(newUser);
	res.send(generateTokenResponse(dbUser));
});

router.post("/login", async (req, res) => {
	const { email, password } = req.body;

	// const user = sample_user.find(
	// 	(user) => user.email === email && user.password === password,
	// );
	const user = await UserModel.findOne({ email, password });
	console.log("user", user);

	if (user) {
		res.send(generateTokenResponse(user));
	} else {
		res.status(400).send("No user found");
	}
});
const generateTokenResponse = (user) => {
	const token = jwt.sign(
		{ id: user.id, email: user.email, isAdmin: user.isAdmin },
		process.env.SECRET_KEY,
		{
			expiresIn: "30d",
		},
	);

	return {
		id: user.id,
		email: user.email,
		name: user.name,
		address: user.address,
		isAdmin: user.isAdmin,
		token: token,
	};
};
module.exports = router;
