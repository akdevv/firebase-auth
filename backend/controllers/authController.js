import admin from "../config/firebaseAdmin.js";

const login = (req) => {
	const { email, password } = req.body;

	console.log("email = ", email);
	console.log("password = ", password);
};

const loginGoogle = async (req, res) => {
	const { token } = req.body;

	try {
		const decodedToken = await admin.auth().verifyIdToken(token);
		console.log("decodedToken: ", decodedToken);
		return res.status(200).json({
			message: "User logged in successfully!",
		});
	} catch (err) {
		console.error("Error verifying token:", err.message);
	}
};

export { login, loginGoogle };
