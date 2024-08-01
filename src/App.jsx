import router from "./routes/Router";
import { RouterProvider } from "react-router-dom";

function App() {
	return (
		<>
			<div className="bg-[url('src/assets/background.png')] bg-cover bg-no-repeat h-screen">
				<RouterProvider router={router} />
			</div>
		</>
	);
}

export default App;
