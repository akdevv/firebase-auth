import express from "express";
import { login, loginGoogle } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", login);
router.post("/login/google", loginGoogle);

export default router;