import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Create new organization (Admin only)
export const createOrganization = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.user.id;

    const organization = await prisma.organization.create({
      data: {
        name,
        users: { connect: { id: userId } } // connect admin user
      },
    });

    await prisma.user.update({
      where: { id: userId },
      data: { organizationId: organization.id },
    });

    res.status(201).json({ message: "Organization created", organization });
  } catch (error) {
    res.status(500).json({ message: "Failed to create organization", error: error.message });
  }
};

// Get all organizations (Admins only)
export const getOrganizations = async (req, res) => {
  try {
    const organizations = await prisma.organization.findMany({
      include: { users: true },
    });
    res.json(organizations);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch organizations", error: error.message });
  }
};

// Add employee to organization
export const addEmployee = async (req, res) => {
  try {
    const { organizationId, employeeEmail, employeeName, password } = req.body;

    // Hash password
    const bcrypt = await import("bcrypt");
    const hashedPassword = await bcrypt.default.hash(password, 10);

    const newEmployee = await prisma.user.create({
      data: {
        name: employeeName,
        email: employeeEmail,
        password: hashedPassword,
        role: "employee",
        organizationId,
      },
    });

    res.status(201).json({ message: "Employee added successfully", newEmployee });
  } catch (error) {
    res.status(500).json({ message: "Failed to add employee", error: error.message });
  }
};

// Get single organization by ID (only if user belongs to it)
export const getOrganizationById = async (req, res) => {
  try {
    const { organizationId } = req.params;

    if (!organizationId) {
      return res.status(400).json({ message: "Organization ID is required" });
    }

    const orgId = Number(organizationId);
    if (isNaN(orgId)) {
      return res.status(400).json({ message: "Organization ID must be a valid number" });
    }

    const organization = await prisma.organization.findUnique({
      where: { id: orgId },
      include: { users: true },
    });

    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }

    // Security check: ensure current user belongs to the same organization
    if (req.user.organizationId !== organization.id) {
      return res.status(403).json({ message: "Access denied for this organization" });
    }

    res.json(organization);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching organization",
      error: error.message,
    });
  }
};
