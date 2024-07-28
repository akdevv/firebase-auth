import axios from "axios";
import { useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("null");

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
				`${import.meta.env.VITE_BACKEND_DOMAIN}/api/auth/google-auth`,
				{ token }
			);
			console.log("response = ", response.data.user);
			if (response.data) {
				setName(response.data.user.name);
			}
		} catch (err) {
			console.error("Something went wrong!", err.message);
		}
	};

	// add apple login also

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
			<div
				style={{
					marginTop: "5px",
					textDecoration: "underline",
				}}
			>
				Welcome, {name}
			</div>
		</div>
	);
}

export default Login;
