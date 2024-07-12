import Home from "../pages/Home";
import Users from "../pages/Users";
import Profile from "../pages/Profile";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
	{ path: "/", element: <Home /> },
	{ path: "/users", element: <Users /> },
	{ path: "/profile", element: <Profile /> },
]);

export default router;
