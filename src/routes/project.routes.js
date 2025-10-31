import express from "express";
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/project.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/role.middleware.js";

const router = express.Router();

// Admin can create, update, delete
router.post("/", verifyToken, isAdmin, createProject);
router.put("/:projectId", verifyToken, isAdmin, updateProject);
router.delete("/:projectId", verifyToken, isAdmin, deleteProject);

// All org members can view
router.get("/", verifyToken, getProjects);
router.get("/:projectId", verifyToken, getProjectById);

export default router;
