const { Schema, model } = require("mongoose");

const FoodSchema = new Schema(
	{
		name: { type: String, required: true },
		price: { type: Number, required: true },
		tags: { type: [String], required: true },
		favorite: { type: Boolean, required: true },
		stars: { type: Number, required: true },
		imageUrl: { type: String, required: true },
		origins: { type: [String], required: true },
		cookTime: { type: String, required: true },
	},
	{
		toJSON: {
			virtuals: true,
		},
		toObject: {
			virtuals: true,
		},
		timestamps: true,
	},
);
const FoodModel = model("food", FoodSchema);
module.exports = { FoodModel, FoodSchema };
