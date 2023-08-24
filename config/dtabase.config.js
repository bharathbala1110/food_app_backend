const { connect } = require("mongoose");

const dbConnect = async () => {
	connect(process.env.MANGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}).then(
		() => console.log("connect successfully"),
		(error) => console.log(error),
	);
};
module.exports = { dbConnect };
