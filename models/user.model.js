const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true },
		password: { type: String, required: true },
		address: { type: String, required: true },
		isAdmin: { type: Boolean, required: true },
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
const UserModel = model("user", UserSchema);
module.exports = UserModel;
