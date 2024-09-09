# firebase-auth

Simple project to help you quickly setup firebase authentication with MongoDB integration in your React codebase!

## Table of Contents

-   [Folder Structure](#folder-structure)
-   [Screenshots](#screenshots)
-   [Getting Started](#getting-started)
-   [How to Run Locally](#how-to-run-locally)
-   [Firebase Setup](#firebase-setup)
    -   [Create Firebase Project](#create-firebase-project)
    -   [Enable Firebase Authentication](#enable-firebase-authentication)
    -   [Configure Firebase in React](#configure-firebase-in-react)
-   [MongoDB Integration](#mongodb-integration)
-   [Setting Up Login Using Email & Password](#setting-up-login-using-email--password)
-   [Setting Up Login Using Google and GitHub](#setting-up-login-using-google-and-github)
    -   [Google](#google)
    -   [GitHub](#github)

## Folder Structure

Here's the overview of the project's folder structure:

```
├── backend/
│   ├── config/
│   │   ├── firebaseAdmin.js          # Firebase Admin setup
│   ├── controllers/
│   │   ├── authController.js         # Handles auth logic
│   │   ├── userController.js         # Manages user operations
│   ├── database/
│   │   ├── index.js                  # MongoDB connection
│   ├── models/
│   │   ├── user.model.js             # MongoDB user model
│   ├── routes/
│   │   ├── authRoutes.js             # Auth routes
│   │   ├── userRoutes.js             # User routes
│   └── server.js                     # Express server setup
├── src/
│   ├── assets/                       # Static images
│   ├── components/
│   │   ├── Footer.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   ├── config/
│   │   ├── firebase.js               # Firebase client config
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Profile.jsx
│   ├── routes/
│   │   ├── Router.jsx                # React Router setup
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
├── index.html
├── tailwind.config.js                # Tailwind setup
└── README.md                         # Project documentation
```

## Screenshots

![Home Page](/src/assets/HomePage.png)
![Login Page](/src/assets/LoginPage.png)
![Register Page](/src/assets/RegisterPage.png)

## Getting Started

### Prerequisites

-   Node.js (v14 or higher)
-   MongoDB (local or cloud)
-   Firebase Account

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/akdevv/firebase-auth
    cd firebase-auth
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up your environment variables in a `.env` file:

```js
    # Firebase Keys
    VITE_FIREBASE_API_KEY=<<your-firebase-api-key>>
    VITE_FIREBASE_AUTH_DOMAIN=<<your-firebase-auth-domain>>
    VITE_FIREBASE_PROJECT_ID=<<your-firebase-project-id>>
    VITE_FIREBASE_STORAGE_BUCKET=<<your-firebase-storage-bucket>>
    VITE_FIREBASE_MESSAGING_SENDER_ID=<<your-firebase-messaging-sender-id>>
    VITE_FIREBASE_APP_ID=<<your-firebase-app-id>>

    # Firebase Client
    FIREBASE_PROJECT_ID=<<your-firebase-project-id>>
    FIREBASE_CLIENT_EMAIL=<<your-firebase-client-email>>
    FIREBASE_PRIVATE_KEY=<<your-firebase-private-key>>

    # MongoDB
    MONGODB_URI=<<your-mongodb-uri>>

    # Backend Domain
    VITE_BACKEND_DOMAIN=<<your-backend-domain>>
```

## How to Run Locally

1. Start the React development server:

    ```bash
    npm run dev
    ```

2. Visit `http://localhost:5173` in your browser to view the app.

## Firebase Setup

### Create Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Click on "Add Project" and follow the setup instructions.
3. Add your app to the project and get the Firebase configuration keys.

### Enable Firebase Authentication

1. In the Firebase Console, navigate to "Authentication" > "Sign-in method".
2. Enable the sign-in providers you want (Email/Password, Google, GitHub).

### Configure Firebase in React

1. Create a new file in `src/config/firebase.js`:

    ```js
    import { initializeApp } from "firebase/app";
    import {
    	getAuth,
    	GoogleAuthProvider,
    	GithubAuthProvider,
    } from "firebase/auth";

    const firebaseConfig = {
    	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    	appId: import.meta.env.VITE_FIREBASE_APP_ID,
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    export const auth = getAuth(app);
    export const githubProvider = new GithubAuthProvider();
    export const googleProvider = new GoogleAuthProvider();
    ```

2. Setup firebase admin authentication: `backend/config/firebaseAdmin.js`

    ```js
    import dotenv from "dotenv";
    import admin from "firebase-admin";

    dotenv.config();
    admin.initializeApp({
    	credential: admin.credential.cert({
    		projectId: process.env.FIREBASE_PROJECT_ID,
    		clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    		privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    	}),
    });

    export default admin;
    ```

3. Use the `auth` object in your React components to manage authentication.

## MongoDB Integration

Set up your MongoDB connection using Mongoose or another MongoDB client.

```js
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI);
		console.log("MongoDB connected...");
	} catch (err) {
		console.error(err.message);
	}
};

export default connectDB;
```

## Setting Up Login Using Email & Password

1. Create Login Component
   In `src/components/Login.jsx`, create forms for Email & Password login:

    ```js
    // Email Login
    const handleLogin = useCallback(async () => {
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
    		if (response.status === 200) {
    			localStorage.setItem("token", token);
    			navigate("/profile");
    		}
    	} catch (err) {
    		console.error("Something went wrong!", err.message);
    	}
    }, [email, password, navigate]);
    ```

2. Create Authentication Routes
   In `backend/routes/authRoutes.js`, create routes to handle login (`/login`):

    ```js
    import express from "express";
    import { login } from "../controllers/authController.js";

    const router = express.Router();

    router.post("/login", login);
    // other routes...

    export default router;
    ```

3. Make Controllers
   Use the Firebase Admin SDK in `backend/controllers/authController.js` to verify tokens received from the frontend:

    ```js
    import User from "../models/user.models.js";
    import admin from "../config/firebaseAdmin.js";

    // LOGIN ROUTE
    const login = async (req, res) => {
    	const { token } = req.body;

    	try {
    		const decodedToken = await admin.auth().verifyIdToken(token);
    		const { uid } = decodedToken;

    		// Check if the user exists in MongoDB
    		const user = await User.findOne({ userId: uid });
    		if (!user) {
    			return res.status(401).json({
    				status: 401,
    				error: "User not found!",
    			});
    		}

    		return res.status(200).json({
    			status: 200,
    			message: "User logged in successfully!",
    		});
    	} catch (err) {
    		console.error("Error verifying token: ", err.message);
    		return res.status(401).json({
    			status: 401,
    			error: "Unauthorized",
    		});
    	}
    };
    // other controllers...
    ```

## Setting Up Login Using Google and GitHub

### Google

1. Fontend logic

    ```js
    const handleGoogleLogin = async () => {
    	try {
    		const data = await signInWithPopup(auth, googleProvider);
    		const token = await data.user.getIdToken();

    		const response = await axios.post(
    			`${import.meta.env.VITE_BACKEND_DOMAIN}/api/auth/google-auth`,
    			{ token }
    		);
    		if (response.status === 200) {
    			localStorage.setItem("token", token);
    			navigate("/profile");
    		}
    	} catch (err) {
    		console.error("Something went wrong!", err.message);
    	}
    };
    ```

2. Backend logic

    ```js
    const loginOrRegisterGoogle = async (req, res) => {
    	const { token } = req.body;

    	try {
    		const decodedToken = await admin.auth().verifyIdToken(token);
    		const { uid, name, email, picture } = decodedToken;

    		// Check if the user exists in MongoDB
    		let user = await User.findOne({ userId: uid });
    		if (!user) {
    			user = new User({
    				userId: uid,
    				name,
    				email,
    				photoURL: picture || "https://placehold.co/400",
    			});
    			await user.save();
    		}

    		return res.status(200).json({
    			status: 200,
    			data: user,
    			message: "User logged in successfully!",
    		});
    	} catch (err) {
    		console.error("Error verifying token: ", err.message);
    		return res.status(401).json({
    			status: 401,
    			error: "Unauthorized",
    		});
    	}
    };
    ```

### GitHub

1. Frontend logic

    ```js
    const handleGithubLogin = async () => {
    	try {
    		const data = await signInWithPopup(auth, githubProvider);
    		const token = await data.user.getIdToken();

    		const response = await axios.post(
    			`${import.meta.env.VITE_BACKEND_DOMAIN}/api/auth/github-auth`,
    			{ token }
    		);
    		if (response.status === 200) {
    			localStorage.setItem("token", token);
    			navigate("/profile");
    		}
    	} catch (err) {
    		console.error("Something went wrong!", err.message);
    	}
    };
    ```

2. Backend logic

    ```js
    const loginOrRegisterGithub = async (req, res) => {
    	const { token } = req.body;

    	try {
    		const decodedToken = await admin.auth().verifyIdToken(token);
    		const { uid, name, email, picture } = decodedToken;

    		// Check if the user exists in MongoDB
    		let user = await User.findOne({ userId: uid });
    		if (!user) {
    			user = new User({
    				userId: uid,
    				name,
    				email,
    				photoURL: picture || "https://placehold.co/400",
    			});
    			await user.save();
    		}

    		return res.status(200).json({
    			status: 200,
    			data: user,
    			message: "User logged in successfully!",
    		});
    	} catch (err) {
    		console.error("Error verifying token: ", err.message);
    		return res.status(401).json({
    			status: 401,
    			error: "Unauthorized",
    		});
    	}
    };
    ```
