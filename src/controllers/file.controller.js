import { PrismaClient } from "@prisma/client";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier"; //needed for buffer -> stream

const prisma = new PrismaClient();

export const uploadFile = async (req, res) => {
  try {
    const file = req.file;
    const { projectId, taskId } = req.body;
    const { id: userId, organizationId } = req.user;

    if (!file) return res.status(400).json({ message: "No file uploaded" });

    // Wrap Cloudinary upload_stream in a Promise
    const uploadToCloudinary = () => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "multi-org-task-manager" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        streamifier.createReadStream(file.buffer).pipe(uploadStream);
      });
    };

    const uploadResult = await uploadToCloudinary();

    // Organization validation (same logic as before)
    if (projectId) {
      const project = await prisma.project.findUnique({
        where: { id: Number(projectId) },
      });
      if (!project || project.organizationId !== organizationId) {
        return res.status(403).json({ message: "Access denied for this project" });
      }
    }

    if (taskId) {
      const task = await prisma.task.findUnique({
        where: { id: Number(taskId) },
        include: { project: true },
      });
      if (!task || task.project.organizationId !== organizationId) {
        return res.status(403).json({ message: "Access denied for this task" });
      }
    }

    // Save file info in DB
    const savedFile = await prisma.file.create({
      data: {
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id,
        fileType: file.mimetype,
        uploadedById: userId,
        projectId: projectId ? Number(projectId) : null,
        taskId: taskId ? Number(taskId) : null,
      },
    });

    res.status(201).json({
      message: "File uploaded successfully",
      file: savedFile,
    });
  } catch (error) {
    console.error("Upload failed:", error);
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
};

// Get all files for the logged-in user’s organization
export const getFiles = async (req, res) => {
  try {
    const { organizationId, role } = req.user;

    const files =
      role === "admin"
        ? await prisma.file.findMany({
            where: { project: { organizationId } },
            include: { uploadedBy: true, project: true, task: true },
          })
        : await prisma.file.findMany({
            where: {
              uploadedById: req.user.id,
              project: { organizationId },
            },
            include: { uploadedBy: true, project: true, task: true },
          });

    res.json(files);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch files", error: error.message });
  }
};


