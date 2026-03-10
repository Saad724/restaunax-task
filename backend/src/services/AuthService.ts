import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET ?? "secret-hash";
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;

export interface RegisterInput {
  email: string;
  password: string;
  name?: string;
  phone: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginResult {
  user: {
    id: string;
    name: string | null;
    email: string;
    phone: string;
    role: string;
    rewardPoints: number;
    createdAt: Date;
  };
  token: string;
}

const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

const comparePassword = async (plain: string, hashed: string): Promise<boolean> => {
  return bcrypt.compare(plain, hashed);
};

const signToken = (userId: string): string => {
  return jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: "1h" });
};

const register = async (input: RegisterInput): Promise<LoginResult> => {
  const existing = await prisma.user.findUnique({
    where: { email: input.email },
  });

  if (existing) {
    throw new Error("Email already registered");
  }

  const hashedPassword = await hashPassword(input.password);

  const user = await prisma.user.create({
    data: {
      email: input.email,
      password: hashedPassword,
      name: input.name ?? null,
      phone: input.phone,
      role: "user",
    },
  });

  const token = signToken(user.id);

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      rewardPoints: user.rewardPoints,
      createdAt: user.createdAt,
    },
    token,
  };
};

const login = async (input: LoginInput): Promise<LoginResult> => {
  const user = await prisma.user.findUnique({
    where: { email: input.email },
  });

  if (!user) {
    throw new Error("User not registered with this email");
  }

  const match = await comparePassword(input.password, user.password);
  if (!match) {
    throw new Error("Invalid email or password");
  }

  const token = signToken(user.id);

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      rewardPoints: user.rewardPoints,
      createdAt: user.createdAt,
    },
    token,
  };
};

const AuthService = {
  register,
  login,
};

export default AuthService;
