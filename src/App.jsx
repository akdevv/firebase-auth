import Footer from "./components/Footer";
import router from "./routes/Router";
import { RouterProvider } from "react-router-dom";

function App() {
	return (
		<>
			<div className="bg-[url('src/assets/background.png')] bg-cover bg-no-repeat h-dvh flex items-center w-full flex-col justify-between p-20">
				<RouterProvider router={router} />
				<Footer />
			</div>
		</>
	);
}

export default App;
