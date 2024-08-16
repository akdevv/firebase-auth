import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
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
			const token = await data.user.getIdToken();

			const response = await axios.post(
				`${import.meta.env.VITE_BACKEND_DOMAIN}/api/auth/login`,
				{ token }
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
		} catch (err) {
			console.error("Something went wrong!", err.message);
		}
	};

	// add apple login also

	return (
		<>
			<div className="flex w-3/5 h-auto bg-white rounded-md shadow-neo">
				<div className="w-1/2 m-6">
					<img
						src="src/assets/login-cover.png"
						alt="img"
						className="rounded-md h-fit"
					/>
				</div>
				<div className="w-1/2 mx-6 my-20">
					<h1 className="text-3xl text-center font-archivo">Login</h1>
					{/* inputs */}
					<div className="mt-5">
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
							<label
								htmlFor="password"
								className="flex font-lexend"
							>
								Password
							</label>
							<input
								type="text"
								id="password"
								value={password}
								placeholder="Enter your password"
								onChange={(evt) =>
									setPassword(evt.target.value)
								}
								className="w-full p-3 border-2 border-black rounded-md font-lexend"
							/>
						</div>
						<div className="p-1 text-xs text-right font-lexend">
							Forgot Password?
						</div>
					</div>

					{/* login button */}
					<div className="mt-5">
						<button className="w-full py-3 text-xl duration-300 rounded-md shadow-neo bg-firebaseYellow hover:shadow-none hover:translate-x-1 hover:translate-y-1 font-archivo">
							Login
						</button>
					</div>

					{/* seprator */}
					<div className="flex items-center mt-5">
						<div className="w-1/2 bg-black h-0.5 ml-10 mr-2"></div>
						<span className="text-xs font-lexend">or</span>
						<div className="w-1/2 bg-black h-0.5 mr-10 ml-2"></div>
					</div>

					{/* sso login buttons */}
					<div className="mt-5">
						<button
							onClick={handleGoogleLogin}
							className="flex items-center justify-center w-full p-3 duration-500 border-2 border-black rounded-md hover:bg-gray-300"
						>
							<img
								src="src/assets/google-logo.svg"
								alt="google logo"
								className="mr-2"
							/>
							<span className="font-lexend">
								Login with Google
							</span>
						</button>

						<button className="flex items-center justify-center w-full p-3 mt-2 duration-500 border-2 border-black rounded-md hover:bg-gray-300">
							<img
								src="src/assets/apple-logo.svg"
								alt="apple logo"
								className="mr-2"
							/>
							<span className="font-lexend">
								Login with Apple
							</span>
						</button>
					</div>

					{/* register redirect */}
					<div className="mt-2">
						<span className="font-lexend">New here? </span>
						<button className="underline font-lexend">
							<Link to="/register">Register</Link>
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default Login;
