const dotenv = require("dotenv");
const db = require("./config/dtabase.config");
dotenv.config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
const cors = require("cors");
db.dbConnect();
const { sample_foods, sample_tags, sample_user } = require("./data");
const foodRouter = require("./router/food.router");
const userRouter = require("./router/user.router");
const orderRouter = require("./router/order.router");

app.use(
	cors({
		credentials: true,
		origin: ["http://localhost:4200"],
	}),
);
app.use("/api/foods", foodRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

const port = 5000;
app.listen(port, () => {
	console.log("website server on http//localhost:" + port);
});
