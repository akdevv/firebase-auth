import { Link } from "react-router-dom";

function Home() {
	return (
		<>
			<div className="main-title">Firebase Auth</div>
			<div>
				<button>
					<Link to="login">Login</Link>
				</button>
				<button>
					<Link to="register">Register</Link>
				</button>
			</div>
		</>
	);
}

export default Home;
