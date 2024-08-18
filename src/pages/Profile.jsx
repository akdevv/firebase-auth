import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
	const [userData, setUserData] = useState(null);

	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("token");

		if (!token) {
			navigate("/");
			return;
		}

		const fetchUserData = async () => {
			try {
				const token = localStorage.getItem("token");
				const response = await axios.post(
					`${import.meta.env.VITE_BACKEND_DOMAIN}/api/user/getUser`,
					{ token }
				);

				if (response.status === 200) {
					setUserData(response.data);
				} else {
					console.error("Failed to fetch user data!");
				}
			} catch (err) {
				console.error("Something went wrong!", err);
			}
		};

		fetchUserData();
	}, []);

	const handleLogout = () => {
		localStorage.removeItem("token");
		navigate("/");
	};

	return (
		<>
			<div className="flex justify-center w-auto h-auto p-10 bg-white rounded-md shadow-neo">
				<div>
					{userData ? (
						<>
							<div>
								<img
									src={userData.user.photoURL}
									alt="user photo"
									className="m-auto border-2 border-black rounded-full w-36"
								/>
								<div className="mt-5">
									<h2 className="text-xs text-gray-700 font-lexend">
										Name
									</h2>
									<p className="text-lg underline font-lexend">
										{userData.user.name}
									</p>
								</div>
								<div className="mt-2">
									<h2 className="text-xs text-gray-700 font-lexend">
										Email
									</h2>
									<p className="text-lg underline font-lexend">
										{userData.user.email}
									</p>
								</div>
							</div>
							<div className="mt-5">
								<button
									className="w-full py-3 text-xl duration-300 rounded-md shadow-neo bg-firebaseRed hover:shadow-none hover:translate-x-1 hover:translate-y-1 font-archivo"
									onClick={handleLogout}
								>
									Logout
								</button>
							</div>
						</>
					) : (
						<div className="text-lg font-lexend">
							Loading user data...
						</div>
					)}
				</div>
			</div>
		</>
	);
}

export default Profile;
