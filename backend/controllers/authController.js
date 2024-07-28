import User from "../models/user.models.js";
import admin from "../config/firebaseAdmin.js";

const login = (req) => {
	const { email, password } = req.body;

	console.log("email = ", email);
	console.log("password = ", password);
};

const loginOrRegisterGoogle = async (req, res) => {
	const { token } = req.body;

	try {
		const decodedToken = await admin.auth().verifyIdToken(token);
		const { uid, name, email, phoneNumber, picture } = decodedToken;

		// Check if the user exists in MongoDB
		let user = await User.findOne({ userId: uid });
		if (!user) {
			user = new User({
				userId: uid,
				name,
				email,
				phoneNumber: phoneNumber || "",
				photoURL: picture || "",
			});
			await user.save();
		}
		console.log("user: ", user);
		return res.status(200).json({
			message: "User logged in successfully!",
			user,
		});
	} catch (err) {
		console.error("Error verifying token: ", err.message);
		return res.status(401).json({
			error: "Unauthorized",
		});
	}
};

// REGISTER ROUTES
const register = async (req, res) => {
	const { data } = req.body;

	console.log(data.user.uid);
};

export { login, loginOrRegisterGoogle, register };
