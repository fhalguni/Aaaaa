import { error } from "console";
import studentService from "../services/studentService";
import { Request, Response } from "express";
class StudentController {
  async searchBook(req: Request, res: Response) {
    try {
      const { title } = req.body;
      const book = await studentService.searchBook(title);

      res.status(200).json({
        message: "success",
        data: book,
      });
    } catch (err) {
      res.status(404).json({
        message: "error",
        error: err,
      });
    }
  }
  async viewBook(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const book = await studentService.viewBook(+id);

      res.status(200).json({
        message: "success",
        data: book,
      });
    } catch (err) {
      res.status(404).json({
        message: "error",
        error: err,
      });
    }
  }
  async borrowBook(req: Request, res: Response) {
    try {
      const { studentId, bookId } = req.body;
      const book = await studentService.borrowBook(+studentId, +bookId);

      res.status(200).json({
        message: "success",
        data: book,
      });
    } catch (err) {
      res.status(404).json({
        message: "error",
        error: err,
      });
    }
  }

  async returnBook(req: Request, res: Response) {
    try {
      const { studentId, bookId } = req.body;
      const book = await studentService.returnBook(+studentId, +bookId);

      res.status(200).json({
        message: "success",
        data: book,
      });
    } catch (err) {
      res.status(404).json({
        message: "error",
        error: err,
      });
    }
  }
}

export default new StudentController();
