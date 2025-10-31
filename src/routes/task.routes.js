import express from "express";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getAllTasks,
} from "../controllers/task.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/role.middleware.js";

const router = express.Router();

router.post("/", verifyToken, isAdmin, createTask);
router.get("/", verifyToken, getTasks);
router.put("/:taskId", verifyToken, updateTask);
router.delete("/:taskId", verifyToken, isAdmin, deleteTask);
router.get("/", verifyToken, getAllTasks);

export default router;
