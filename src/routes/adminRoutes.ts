import express, { Router } from "express";
import { AdminController } from "../controllers/adminController";
import { authenticateUser, authorizeRole } from "../middleware/middleware";
const adminController = new AdminController();
const router = express.Router();

router.post(
  "/addBook",
  authenticateUser,
  authorizeRole(["Admin"]),
  adminController.addBook
);
router.put(
  "/updateBook/:id",
  authenticateUser,
  authorizeRole(["Admin"]),
  adminController.updateBook
);
router.delete(
  "/deleteBook/:id",
  authenticateUser,
  authorizeRole(["Admin"]),
  adminController.deleteBook
);

export { router as adminRouter };
