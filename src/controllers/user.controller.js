import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const changeUserRole = async (req, res) => {
  try {
    const { userId, newRole } = req.body;
    const { organizationId, role } = req.user;

    if (role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    if (!["admin", "employee"].includes(newRole)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const user = await prisma.user.findUnique({ where: { id: Number(userId) } });

    if (!user || user.organizationId !== organizationId) {
      return res.status(403).json({ message: "User does not belong to your organization" });
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { role: newRole },
    });

    res.status(200).json({
      message: `User role changed to ${newRole}`,
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to change user role", error: error.message });
  }
};
