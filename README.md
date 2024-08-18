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
-   [Contributing](#contributing)
-   [License](#license)

## Folder Structure

Here's a basic overview of the project's folder structure:

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

Include some screenshots of your project, showcasing the login screen, authentication flow, and MongoDB data integration.

![Login Screen](path/to/screenshot1.png)
![MongoDB Integration](path/to/screenshot2.png)

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

```bash
    CLOUDINARY_CLOUD_NAME=<<your-cloud-name>>
    CLOUDINARY_API_KEY=<<your-api-key>>
    CLOUDINARY_API_SECRET=<<your-api-secret>>
    MAPBOX_TOKEN=<<your-mapbox-token>>
    DB_URL=<<your-mongodb-url>>
    SECRET=<<secret-pharase>>
```

## How to Run Locally

1. Start the React development server:

    ```bash
    npm run dev
    ```

2. Visit `http://localhost:3000` in your browser to view the app.

## Firebase Setup

### Create Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Click on "Add Project" and follow the setup instructions.
3. Add your app to the project and get the Firebase configuration keys.

### Enable Firebase Authentication

1. In the Firebase Console, navigate to "Authentication" > "Sign-in method".
2. Enable the sign-in providers you want (Email/Password, Google, GitHub).

### Configure Firebase in React

1. Create a new file in `src/firebase/firebaseConfig.js`:

    ```javascript
    import { initializeApp } from "firebase/app";
    import { getAuth } from "firebase/auth";

    const firebaseConfig = {
    	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    	appId: process.env.REACT_APP_FIREBASE_APP_ID,
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    export { auth };
    ```

2. Use the `auth` object in your React components to manage authentication.

## MongoDB Integration

1. Set up your MongoDB connection using Mongoose or another MongoDB client.
2. Create a new API route in `/api` to handle data operations (e.g., storing user data, fetching user profiles).
3. Ensure your MongoDB URI is correctly set in the `.env` file.
