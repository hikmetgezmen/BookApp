import express from "express";
import { signIn, refreshAccessToken } from "../controllers/auth.controller.js";
const router = express.Router();

router.route("/").post(signIn).put(refreshAccessToken);

export default router;
