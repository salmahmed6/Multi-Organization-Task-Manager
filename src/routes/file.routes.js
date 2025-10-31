import express from "express";
import { uploadFile, getFiles } from "../controllers/file.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

router.post("/upload", verifyToken, upload.single("file"), uploadFile);
router.get("/", verifyToken, getFiles);

export default router;
