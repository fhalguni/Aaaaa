import { Request, Response } from "express";
import { AuthService } from "../services/authService";
const authService = new AuthService();
class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { name, email, password, role } = req.body;

      await authService.registerUser(name, email, password, role);
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      if (error instanceof Error)
        res.status(500).json({ error: error.message });
    }
  }
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const data = await authService.loginUser(email, password);
      res.status(200).json({ message: "Login successful", ...data });
    } catch (error) {
      if (error instanceof Error)
        res.status(401).json({ error: error.message });
    }
  }
}

export { AuthController };
