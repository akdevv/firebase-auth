import User from "../models/user.models.js";
import admin from "../config/firebaseAdmin.js";

// LOGIN ROUTE
const login = async (req, res) => {
	const { token } = req.body;

	try {
		const decodedToken = await admin.auth().verifyIdToken(token);
		const { uid } = decodedToken;

		// Check if the user exists in MongoDB
		const user = await User.findOne({ userId: uid });
		if (!user) {
			return res.status(401).json({
				error: "User not found!",
			});
		}

		return res.status(200).json({
			message: "User logged in successfully!",
		});
	} catch (err) {
		console.error("Error verifying token: ", err.message);
		return res.status(401).json({
			error: "Unauthorized",
		});
	}
};

// REGISTER ROUTE
const register = async (req, res) => {
	const { token } = req.body;

	try {
		const decodedToken = await admin.auth().verifyIdToken(token);
		const { uid, name, email, picture } = decodedToken;

		// Check if the user exists in MongoDB
		let user = await User.findOne({ userId: uid });
		if (user) {
			return res.status(400).json({
				message: "User already exists!",
			});
		} else {
			user = new User({
				userId: uid,
				name,
				email,
				photoURL: picture || null,
			});
			await user.save();
		}

		return res.status(200).json({
			message: "User registered successfully!",
		});
	} catch (err) {
		console.error("Error verifying token: ", err.message);
		return res.status(401).json({
			error: "Unauthorized",
		});
	}
};

const loginOrRegisterGoogle = async (req, res) => {
	const { token } = req.body;

	try {
		const decodedToken = await admin.auth().verifyIdToken(token);
		const { uid, name, email, picture } = decodedToken;

		// Check if the user exists in MongoDB
		let user = await User.findOne({ userId: uid });
		if (!user) {
			user = new User({
				userId: uid,
				name,
				email,
				photoURL: picture || null,
			});
			await user.save();
		}

		return res.status(200).json({
			message: "User logged in successfully!",
		});
	} catch (err) {
		console.error("Error verifying token: ", err.message);
		return res.status(401).json({
			error: "Unauthorized",
		});
	}
};

export { login, register, loginOrRegisterGoogle };
