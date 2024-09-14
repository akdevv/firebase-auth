import express from "express";
import {
	login,
	register,
	loginOrRegisterGoogle,
	loginOrRegisterGithub,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/github-auth", loginOrRegisterGithub);
router.post("/google-auth", loginOrRegisterGoogle);

export default router;
