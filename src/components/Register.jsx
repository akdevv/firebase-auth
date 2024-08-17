import axios from "axios";
import { useState } from "react";
import {
	updateProfile,
	signInWithPopup,
	createUserWithEmailAndPassword,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../config/firebase";

function Register() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();

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
			if (response.status === 200) {
				localStorage.setItem("token", token);
				navigate("/profile");
			}
			console.log("Backend response = ", response.data);
		} catch (err) {
			console.error("Something went wrong!", err.message);
		}
	};

	// Google Register
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
		<>
			<div className="flex w-3/5 h-auto bg-white rounded-md shadow-neo">
				<div className="w-1/2 m-6">
					<img
						src="src/assets/login-cover.png"
						alt="img"
						className="w-full h-full rounded-md"
					/>
				</div>
				<div className="w-1/2 mx-6 my-6">
					<h1 className="text-3xl text-center font-archivo">
						Register
					</h1>
					{/* inputs */}
					<div className="mt-5">
						<label htmlFor="name" className="flex font-lexend">
							Name
						</label>
						<input
							type="text"
							id="name"
							value={name}
							placeholder="Enter your name"
							onChange={(evt) => setName(evt.target.value)}
							className="w-full p-3 border-2 border-black rounded-md font-lexend"
						/>
					</div>
					<div>
						<label htmlFor="email" className="flex font-lexend">
							Email
						</label>
						<input
							type="text"
							id="email"
							value={email}
							placeholder="Enter your email"
							onChange={(evt) => setEmail(evt.target.value)}
							className="w-full p-3 border-2 border-black rounded-md font-lexend"
						/>
					</div>
					<div className="mt-2">
						<label htmlFor="password" className="flex font-lexend">
							Password
						</label>
						<input
							type="text"
							id="password"
							value={password}
							placeholder="Enter your password"
							onChange={(evt) => setPassword(evt.target.value)}
							className="w-full p-3 border-2 border-black rounded-md font-lexend"
						/>
					</div>

					{/* register button */}
					<div className="mt-5">
						<button
							className="w-full py-3 text-xl duration-300 rounded-md shadow-neo bg-firebaseOrange hover:shadow-none hover:translate-x-1 hover:translate-y-1 font-archivo"
							onClick={handleRegister}
						>
							Register
						</button>
					</div>

					{/* seprator */}
					<div className="flex items-center mt-5">
						<div className="w-1/2 bg-black h-0.5 ml-10 mr-2"></div>
						<span className="text-xs font-lexend">or</span>
						<div className="w-1/2 bg-black h-0.5 mr-10 ml-2"></div>
					</div>

					{/* sso register buttons */}
					<div className="mt-5">
						<button
							onClick={() => {}}
							className="flex items-center justify-center w-full p-3 duration-500 border-2 border-black rounded-md hover:bg-gray-300"
						>
							<img
								src="src/assets/google-logo.svg"
								alt="google logo"
								className="mr-2"
							/>
							<span className="font-lexend">
								Register with Google
							</span>
						</button>

						<button className="flex items-center justify-center w-full p-3 mt-2 duration-500 border-2 border-black rounded-md hover:bg-gray-300">
							<img
								src="src/assets/apple-logo.svg"
								alt="apple logo"
								className="mr-2"
							/>
							<span className="font-lexend">
								Register with Apple
							</span>
						</button>
					</div>

					{/* register redirect */}
					<div className="mt-2">
						<span className="font-lexend">Have an account? </span>
						<button className="underline font-lexend">
							<Link to="/login">Login</Link>
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default Register;
