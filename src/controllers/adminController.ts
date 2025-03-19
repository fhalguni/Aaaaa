import { IRecordSet } from "mssql";
import { AdminService } from "../services/AdminService";
import { Request, Response } from "express";
import { Book } from "../models/bookModel";
const adminService = new AdminService();
class AdminController {
  async addBook(req: Request, res: Response) {
    try {
      const book = await adminService.addBook(
        req.body.title,
        req.body.author,
        +req.body.price
      );
      console.log(book);

      if (book.rowsAffected[0] <= 0) {
        res.status(400).json({
          message: "Error while add",
        });
        return;
      }

      res.status(200).json({
        message: "Success",
        data: book,
      });
    } catch (err) {
      res.status(404).json({
        message: "error",
        error: err,
      });
    }
  }
  async updateBook(req: Request, res: Response) {
    try {
      const id = req.params.id;

      const book = await adminService.updateBook({ ...req.body, id: +id });
      if (book) {
        res.status(200).json({
          message: "Updated Successfully",
        });
      }
    } catch (err) {
      res.status(404).json({
        message: "error",
        error: err,
      });
    }
  }
  async deleteBook(req: Request, res: Response) {
    try {
      const id = req.params.id;

      const book = await adminService.deleteBook(+id);

      res.status(200).json({
        message: "Deleteed Successfully",
      });
      return;
    } catch (err) {
      res.status(404).json({
        message: "error",
        error: err,
      });
    }
  }
}

export { AdminController };
