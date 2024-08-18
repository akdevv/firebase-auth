import admin from "../config/firebaseAdmin.js";
import User from "../models/user.models.js";

const getUser = async (req, res) => {
	const { token } = req.body;
	try {
		const decodedToken = await admin.auth().verifyIdToken(token);
		const uid = decodedToken.uid;
		const user = await User.findOne({ userId: uid });

		return res.status(200).json({
			status: 200,
			user,
		});
	} catch (err) {
		console.error(err.message);
		if (err.name === "ValidationError") {
			return res.status(400).json({
				status: 400,
				message: "Validation error. Please provide valid data.",
			});
		}
		return res.status(500).json({
			status: 500,
			message: "Something went wrong. Please try again later.",
		});
	}
};

export { getUser };
