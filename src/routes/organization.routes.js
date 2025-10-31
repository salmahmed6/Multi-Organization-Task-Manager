import express from "express";
import {
  createOrganization,
  getOrganizations,
  addEmployee,
  getOrganizationById,
  getOrganizationStats,
} from "../controllers/organization.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/role.middleware.js";

const router = express.Router();

// Only admin can create or view all organizations
router.post("/", verifyToken, isAdmin, createOrganization);
router.get("/", verifyToken, isAdmin, getOrganizations);
router.get("/:organizationId", verifyToken, getOrganizationById);
router.post("/add-employee", verifyToken, isAdmin, addEmployee);
router.get("/stats", verifyToken, isAdmin, getOrganizationStats);

export default router;
