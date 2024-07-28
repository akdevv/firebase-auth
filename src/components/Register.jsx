import axios from "axios";
import { useState } from "react";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

function Register() {
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

			console.log(data);

			const response = await axios.post(
				`${import.meta.env.VITE_BACKEND_DOMAIN}/api/auth/register`,
				{ data }
			);
			console.log("Backend response = ", response.data);
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
		</div>
	);
}

export default Register;
