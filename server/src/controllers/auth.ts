import { Request, Response } from "express";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { generic500Error } from "../utils/constance";

const jwtSecret = process.env.JWT_SECRET;

class AuthController {
  constructor(private prisma: PrismaClient) {}

  async login(req: Request, res: Response) {
    try {
      return;
    } catch (error) {
      generic500Error(res, error);
    }
  }
  async register(req: Request, res: Response) {
    try {
      return;
    } catch (error) {
      generic500Error(res, error);
    }
  }
  async logout(req: Request, res: Response) {
    try {
      return;
    } catch (error) {
      generic500Error(res, error);
    }
  }
  async hashPassword() {}
  async generateJwt() {}
  async comparePassword() {}
  generateRandomAvatar() {}
}

export default AuthController;
