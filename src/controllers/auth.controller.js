import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";

const prisma = new PrismaClient();

export const register = async (req, res) => {
  try {
    const { name, email, password, role, organizationId } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, role, organizationId },
    });

    const token = generateToken(user);
    res.status(201).json({ message: "User registered successfully", token, user });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(user);
    res.json({ message: "Login successful", token, user });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};
