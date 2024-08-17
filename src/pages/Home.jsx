import { Link } from "react-router-dom";

function Home() {
	return (
		<>
			<div className="flex items-center">
				<div>
					<h1 className="text-white text-8xl font-archivo">
						Firebase Auth
					</h1>
					<p className="w-3/4 text-white text-md font-lexend">
						Simple project to help you quickly setup firebase
						authentication with MongoDB integration in your React
						codebase!
					</p>
					<div className="flex gap-10 mt-5">
						<Link to="login" className="text-xl font-archivo">
							<button className="px-10 py-3 duration-300 rounded-md shadow-neo bg-firebaseYellow hover:shadow-none hover:translate-x-1 hover:translate-y-1">
								Login
							</button>
						</Link>

						<Link to="register" className="text-xl font-archivo">
							<button className="px-10 py-3 duration-300 rounded-md shadow-neo bg-firebaseOrange hover:shadow-none hover:translate-x-1 hover:translate-y-1">
								Register
							</button>
						</Link>
					</div>
				</div>
				<div>
					<img
						src="src/assets/firebase-logo.png"
						alt="firebase logo"
					/>
				</div>
			</div>
		</>
	);
}

export default Home;
