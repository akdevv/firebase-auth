import express from "express";
import {
	login,
	loginOrRegisterGoogle,
	register,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/login", login);
router.post("/google-auth", loginOrRegisterGoogle);
router.post("/register", register);

export default router;
