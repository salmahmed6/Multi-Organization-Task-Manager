import express from "express";
import { getNotifications } from "../controllers/notification.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();
router.get("/", verifyToken, getNotifications);
export default router;
