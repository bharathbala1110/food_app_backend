const { verify } = require("jsonwebtoken");
module.exports = (req, res, next) => {
	const token = req.headers.access_token;
	console.log("token", token);

	if (!token) {
		res.status(401).send();
	}

	try {
		const decodedUser = verify(token, process.env.SECRET_KEY);
		req.user = decodedUser;
		console.log("token");
	} catch {
		res.status(401).send();
	}
	return next();
};
