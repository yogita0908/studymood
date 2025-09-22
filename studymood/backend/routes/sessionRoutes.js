// sessionRoutes.js
import express from "express";
import { createSession, getSessions } from "../controllers/sessionController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Protected routes
router.post("/", authMiddleware, createSession);
router.get("/", authMiddleware, getSessions);

export default router;
