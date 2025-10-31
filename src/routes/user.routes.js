import express from "express";
import { changeUserRole } from "../controllers/user.controller.js";
import { verifyToken, isAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.put("/role", verifyToken, isAdmin, changeUserRole);

export default router;
