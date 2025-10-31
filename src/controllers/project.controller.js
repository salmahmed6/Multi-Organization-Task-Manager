import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Create new project (Admin only)
export const createProject = async (req, res) => {
  try {
    const { name, description } = req.body;
    const organizationId = req.user.organizationId;

    const project = await prisma.project.create({
      data: {
        name,
        description,
        organizationId,
      },
    });

    res.status(201).json({ message: "Project created successfully", project });
  } catch (error) {
    res.status(500).json({ message: "Failed to create project", error: error.message });
  }
};

// Get all projects for logged-in user’s organization
export const getProjects = async (req, res) => {
  try {
    const organizationId = req.user.organizationId;

    const projects = await prisma.project.findMany({
      where: { organizationId },
      orderBy: { createdAt: "desc" },
    });

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch projects", error: error.message });
  }
};

// Get project by ID
export const getProjectById = async (req, res) => {
  try {
    const { projectId } = req.params;
    const organizationId = req.user.organizationId;

    const project = await prisma.project.findUnique({
      where: { id: Number(projectId) },
    });

    if (!project) return res.status(404).json({ message: "Project not found" });

    // Security: ensure same organization
    if (project.organizationId !== organizationId) {
      return res.status(403).json({ message: "Access denied for this project" });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Error fetching project", error: error.message });
  }
};

// Update project (Admin only)
export const updateProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { name, description } = req.body;
    const organizationId = req.user.organizationId;

    const existing = await prisma.project.findUnique({
      where: { id: Number(projectId) },
    });

    if (!existing) return res.status(404).json({ message: "Project not found" });
    if (existing.organizationId !== organizationId)
      return res.status(403).json({ message: "You cannot modify this project" });

    const updated = await prisma.project.update({
      where: { id: Number(projectId) },
      data: { name, description },
    });

    res.json({ message: "Project updated", updated });
  } catch (error) {
    res.status(500).json({ message: "Failed to update project", error: error.message });
  }
};

// Delete project (Admin only)
export const deleteProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const organizationId = req.user.organizationId;

    const project = await prisma.project.findUnique({
      where: { id: Number(projectId) },
    });

    if (!project) return res.status(404).json({ message: "Project not found" });
    if (project.organizationId !== organizationId)
      return res.status(403).json({ message: "Access denied" });

    await prisma.project.delete({
      where: { id: Number(projectId) },
    });

    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete project", error: error.message });
  }
};
