import { useState } from "react";
// import { auth } from "../config/firebase";
// import { createUserWithEmailAndPassword } from "firebase/auth";

function Register() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleRegister = async () => {
		console.log("email: ", email);
		console.log("password: ", password);

		// const data = await createUserWithEmailAndPassword(
		// 	auth,
		// 	email,
		// 	password
		// );
		// console.log(data);
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
