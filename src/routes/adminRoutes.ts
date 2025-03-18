import express, { Router } from "express";
import { AdminController } from "../controllers/adminController";
const adminController = new AdminController();
const router = express.Router();

router.post("/addBook", adminController.addBook);
router.put("/updateBook/:id", adminController.updateBook);
router.delete("/deleteBook", adminController.deleteBook);

export { router as adminRouter };
