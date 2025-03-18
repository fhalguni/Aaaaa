import express from "express";
const router = express.Router();
import studentController from "../controllers/studentController";
router.get("/searchBook", studentController.searchBook);
router.get("/viewBook/:id", studentController.viewBook);
router.post("/borrowBook", studentController.borrowBook);
router.delete("/returnBook", studentController.returnBook);

export { router as StudentRouter };
