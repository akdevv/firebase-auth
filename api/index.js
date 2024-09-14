import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import connectDB from "./database/index.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const PORT = 5000;

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.listen(PORT, () => {
	console.log(`Server running on port: ${PORT}`);
});

// For local development, you can add this conditional:
// if (process.env.NODE_ENV !== "production") {
// 	const PORT = 5000;
// 	app.listen(PORT, () => {
// 		console.log(`Server running on port: ${PORT}`);
// 	});
// }

export default app;
