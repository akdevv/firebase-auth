import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import connectDB from "./database/index.js";
import routes from "./routes/authRoutes.js";

const app = express();
const PORT = 5000;

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", routes);

app.listen(PORT, () => {
	console.log(`Server running on port: ${PORT}`);
});
