import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Create Task (Admin only)
export const createTask = async (req, res) => {
  try {
    const { title, description, projectId, assigneeId } = req.body;
    const organizationId = req.user.organizationId;

    // Verify project belongs to the same organization
    const project = await prisma.project.findUnique({ where: { id: projectId } });
    if (!project || project.organizationId !== organizationId)
      return res.status(403).json({ message: "You cannot assign tasks to this project" });

    const task = await prisma.task.create({
      data: { title, description, projectId, assigneeId },
    });

    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Failed to create task", error: error.message });
  }
};

// Get all tasks for logged-in user (Admin sees all, employee sees own)
export const getTasks = async (req, res) => {
  try {
    const { role, organizationId, id } = req.user;

    const filter =
      role === "admin"
        ? { project: { organizationId } }
        : { assigneeId: id, project: { organizationId } };

    const tasks = await prisma.task.findMany({
      where: filter,
      include: { project: true, assignee: true },
      orderBy: { createdAt: "desc" },
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks", error: error.message });
  }
};

// Update task (Admin full update, Employee status only)
export const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, description, status } = req.body;
    const { role, id, organizationId } = req.user;

    const task = await prisma.task.findUnique({
      where: { id: Number(taskId) },
      include: { project: true },
    });

    if (!task) return res.status(404).json({ message: "Task not found" });
    if (task.project.organizationId !== organizationId)
      return res.status(403).json({ message: "Access denied for this task" });

    // Employee can only update their own task status
    if (role === "employee" && task.assigneeId !== id)
      return res.status(403).json({ message: "You cannot update another user's task" });

    const updatedTask =
      role === "admin"
        ? await prisma.task.update({ where: { id: task.id }, data: { title, description, status } })
        : await prisma.task.update({ where: { id: task.id }, data: { status } });

    res.json({ message: "Task updated successfully", updatedTask });
  } catch (error) {
    res.status(500).json({ message: "Failed to update task", error: error.message });
  }
};

// Delete task (Admin only)
export const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { organizationId } = req.user;

    const task = await prisma.task.findUnique({
      where: { id: Number(taskId) },
      include: { project: true },
    });

    if (!task) return res.status(404).json({ message: "Task not found" });
    if (task.project.organizationId !== organizationId)
      return res.status(403).json({ message: "Access denied" });

    await prisma.task.delete({ where: { id: task.id } });
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete task", error: error.message });
  }
};