const { Schema, model } = require("mongoose");
const { FoodSchema } = require("../models/food.model");

const LatLngSchema = new Schema({
	lat: { type: String, required: true },
	lng: { type: String, required: true },
});

const OrderItemSchema = new Schema({
	food: { type: FoodSchema, required: true },
	price: { type: Number, required: true },
	quantity: { type: Number, required: true },
});
const OrderStatus = {
	NEW: "NEW",
	PAYED: "PAYED",
	SHIPPED: "SHIPPED",
	CANCELED: "CANCELED",
	REFUNDED: "REFUNDED",
};

const OrderSchema = new Schema(
	{
		name: { type: String, require: true },
		address: { type: String, require: true },
		addressLatLng: { type: LatLngSchema, require: true },
		paymentId: { type: String },
		totalPrice: { type: Number, required: true },
		items: { type: [OrderItemSchema], required: true },
		status: { type: String, default: OrderStatus.NEW },
		user: { type: Schema.Types.ObjectId, required: true },
	},
	{
		timestamps: true,
		toJSON: {
			virtuals: true,
		},
		toObject: {
			virtuals: true,
		},
	},
);
const OrderModel = model("order", OrderSchema);
module.exports = { OrderModel, OrderStatus };
