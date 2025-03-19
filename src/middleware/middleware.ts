import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const secretKey =
  "155bc56c677dde718c426fbe3d657b47adecf21e6b4a8523bc2af6743fb0fc27";
import { RequestHandler } from "express";
import { AuthRequest } from "../types/AuthRequest";
import { AuthService } from "../services/authService";
import { IResult } from "mssql";
import { User } from "../models/userModel";
const authService = new AuthService();
interface Decoded {
  email: string;
  iat: number;
  exp: number;
}

export const authenticateUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    !req.header("Authorization") ||
    !req.header("Authorization")?.startsWith("Bearer ")
  ) {
    res.status(401).json({ error: "Access denied. No token provided." });
    return;
  }

  const token = req.header("Authorization")?.split(" ")[1];
  try {
    const decoded = jwt.verify(token!, secretKey) as JwtPayload & Decoded;

    const freshUser = await authService.getUserByEmail(decoded.email);
    console.log(freshUser);

    (req as AuthRequest).user = freshUser;

    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token." });
  }
};

export const authorizeRole = (requiredRoles: string[]): RequestHandler => {
  return (req, res, next) => {
    const user = (req as AuthRequest).user;
    console.log(user);

    if (!user || !requiredRoles.includes(user.recordset[0].role)) {
      res
        .status(403)
        .json({ error: "Access denied. Insufficient permissions." });
      return;
    }
    next();
  };
};
