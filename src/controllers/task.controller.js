import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Create Task (Admin only)
export const createTask = async (req, res) => {
  try {
    const { title, description, projectId, assigneeId } = req.body;
    const organizationId = req.user.organizationId;

    //Verify project belongs to the same organization
    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project || project.organizationId !== organizationId) {
      return res
        .status(403)
        .json({ message: "You cannot assign tasks to this project" });
    }

    //Create the new task
    const task = await prisma.task.create({
      data: {
        title,
        description,
        projectId,
        assigneeId,
      },
    });

    //Create a notification for the assignee
    await prisma.notification.create({
      data: {
        userId: assigneeId,
        message: `You have been assigned a new task: ${title}`,
      },
    });

    //Send success response
    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({
      message: "Failed to create task",
      error: error.message,
    });
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

// Get all tasks with pagination and filtering
export const getAllTasks = async (req, res) => {
  try {
    const { organizationId, role, id: userId } = req.user;
    const { page = 1, limit = 10, title, status, assignee } = req.query;

    const skip = (page - 1) * limit;
    const where = {
      project: { organizationId },
      ...(title && { title: { contains: title, mode: "insensitive" } }),
      ...(status && { status }),
      ...(assignee && { assignee: { name: { contains: assignee, mode: "insensitive" } } }),
      ...(role === "employee" ? { assigneeId: userId } : {}),
    };

    const [tasks, total] = await Promise.all([
      prisma.task.findMany({
        where,
        skip: Number(skip),
        take: Number(limit),
        include: { project: true, assignee: true },
      }),
      prisma.task.count({ where }),
    ]);

    res.status(200).json({
      total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
      tasks,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks", error: error.message });
  }
};
