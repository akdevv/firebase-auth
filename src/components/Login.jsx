import axios from "axios";
import { useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	// Email Login
	const handleLogin = async () => {
		try {
			const data = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			console.log("data = ", data);

			const response = await axios.post(
				`${import.meta.env.VITE_BACKEND_DOMAIN}/api/auth/login`,
				{ email, password }
			);
			console.log("Backend response = ", response.data);
		} catch (err) {
			console.error("Something went wrong!", err.message);
		}
	};

	// Google Login
	const handleGoogleLogin = async () => {
		try {
			const data = await signInWithPopup(auth, googleProvider);
			const token = await data.user.getIdToken();

			const response = await axios.post(
				`${import.meta.env.VITE_BACKEND_DOMAIN}/api/auth/login/google`,
				{ token }
			);
			console.log("response = ", response);
		} catch (err) {
			console.error("Something went wrong!", err.message);
		}
	};

	// Phone Login
	const handlePhoneLogin = async () => {
		console.log("Do it later!");
	};

	return (
		<div>
			<div>
				<input
					type="text"
					placeholder="Email"
					value={email}
					onChange={(evt) => setEmail(evt.target.value)}
				/>
				<input
					type="text"
					placeholder="Password"
					value={password}
					onChange={(evt) => setPassword(evt.target.value)}
				/>
			</div>
			<button onClick={handleLogin}>Login</button>
			<br />
			<br />
			<button onClick={handleGoogleLogin}>Google</button>
			<button onClick={handlePhoneLogin}>Phone</button>
		</div>
	);
}

export default Login;
