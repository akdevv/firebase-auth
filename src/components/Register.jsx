import axios from "axios";
import { useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import {
	updateProfile,
	signInWithPopup,
	createUserWithEmailAndPassword,
} from "firebase/auth";

function Register() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	// Email Register
	const handleRegister = async () => {
		try {
			const data = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			// Update the user's name
			await updateProfile(data.user, {
				displayName: name,
			});

			const token = await data.user.getIdToken(true);

			const response = await axios.post(
				`${import.meta.env.VITE_BACKEND_DOMAIN}/api/auth/register`,
				{ token }
			);
			console.log("Backend response = ", response.data);
		} catch (err) {
			console.error("Something went wrong!", err.message);
		}
	};

	// Google Login
	const handleGoogleRegister = async () => {
		try {
			const data = await signInWithPopup(auth, googleProvider);
			const token = await data.user.getIdToken();

			const response = await axios.post(
				`${import.meta.env.VITE_BACKEND_DOMAIN}/api/auth/google-auth`,
				{ token }
			);
			console.log("response = ", response.data.user);
		} catch (err) {
			console.error("Something went wrong!", err.message);
		}
	};

	return (
		<div>
			Register
			<div>
				<input
					type="text"
					placeholder="Name"
					value={name}
					onChange={(evt) => setName(evt.target.value)}
				/>
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
			<button onClick={handleRegister}>Register</button>
			<br />
			<br />
			<button onClick={handleGoogleRegister}>Google</button>
		</div>
	);
}

export default Register;
