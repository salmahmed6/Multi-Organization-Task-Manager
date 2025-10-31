import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const verifyOrganizationAccess = async (req, res, next) => {
  try {
    const { organizationId } = req.params;
    const userOrgId = req.user.organizationId;

    if (Number(organizationId) !== userOrgId) {
      return res.status(403).json({ message: "Access denied to this organization." });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "Authorization check failed", error: error.message });
  }
};
