import express from "express";
const router = express.Router();
import studentController from "../controllers/studentController";
import { authenticateUser, authorizeRole } from "../middleware/middleware";
router.get(
  "/searchBook",
  authenticateUser,
  authorizeRole(["Student"]),
  studentController.searchBook
);
router.get(
  "/viewBook",
  authenticateUser,
  authorizeRole(["Student"]),
  studentController.viewBook
);
router.post(
  "/borrowBook",
  authenticateUser,
  authorizeRole(["Student"]),
  studentController.borrowBook
);
router.delete(
  "/returnBook",
  authenticateUser,
  authorizeRole(["Student"]),
  studentController.returnBook
);

export { router as StudentRouter };
