import axios from "axios";
import { useEffect, useState } from "react";

function Profile() {
	const [userData, setUserData] = useState(null);
	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const token = localStorage.getItem("token");
				const response = await axios.post(
					`${import.meta.env.VITE_BACKEND_DOMAIN}/api/user/getUser`,
					{ token }
				);

				if (response.status === 200) {
					console.log(response.data.message);
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

	return (
		<>
			<div>Profile Page</div>
			<div>
				{userData ? (
					<pre>{JSON.stringify(userData, null, 2)}</pre>
				) : (
					<div>Loading user data...</div>
				)}
			</div>
		</>
	);
}

export default Profile;
