import { Link } from "react-router-dom";

function Home() {
	return (
		<>
			<div>
				<div>
					<div className="text-white text-8xl font-archivo">
						Firebase Auth
					</div>
					<div className="text-white text-md font-lexend">
						Simple project to help you quickly setup firebase
						authentication with MongoDB integration in your React
						codebase!
					</div>
				</div>
				<div>
					<button>
						<Link to="login" className="font-archivo">
							Login
						</Link>
					</button>
					<button>
						<Link to="register" className="font-archivo">
							Register
						</Link>
					</button>
				</div>
				<img src="src/assets/firebase-logo.svg" alt="firebase logo" />
			</div>
		</>
	);
}

export default Home;
