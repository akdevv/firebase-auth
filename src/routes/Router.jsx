import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Login from "../components/Login";
import Register from "../components/Register";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
	{ path: "/", element: <Home /> },
	{ path: "/profile", element: <Profile /> },
	{ path: "/login", element: <Login /> },
	{ path: "/register", element: <Register /> },
]);

export default router;
