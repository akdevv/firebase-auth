import "../index.css";
import { useState } from "react";
import { app } from "../config/firebase";
import {
	getAuth,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
} from "firebase/auth";

function Home() {
	const auth = getAuth();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [em, setEm] = useState("");
	const [pswd, setPswd] = useState("");

	const handleSignup = () => {
		console.log("email: ", email);
		console.log("password: ", password);

		createUserWithEmailAndPassword(auth, email, password)
			.then((response) => {
				console.log("response = ", response);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const handleSignin = () => {
		console.log("em: ", em);
		console.log("pswd: ", pswd);

		signInWithEmailAndPassword(auth, em, pswd)
			.then((response) => {
				console.log("response = ", response);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	return (
		<div>
			<div>Welcome to Firebase Auth</div>
			<br />
			<div>SignUp code</div>
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
			<button onClick={handleSignup}>Sign Up</button>

			<br />
			<br />

			<div>Login code</div>
			<div>
				<input
					type="text"
					placeholder="Email"
					value={em}
					onChange={(evt) => setEm(evt.target.value)}
				/>
				<input
					type="text"
					placeholder="Password"
					value={pswd}
					onChange={(evt) => setPswd(evt.target.value)}
				/>
			</div>
			<button onClick={handleSignin}>Sign In</button>
		</div>
	);
}

export default Home;
