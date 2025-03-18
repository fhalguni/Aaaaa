import { ConnectionPool } from "mssql";
import { poolPromise, sql } from "../config/database";

class studentRepo {
  async searchBook(title: string) {
    const pool = (await poolPromise) as ConnectionPool;
    const result = await pool
      .request()
      .input("title", sql.VarChar, title)
      .query(`SELECT * FROM book_tbl WHERE title = @title`);

    return result.recordset;
  }

  async viewBook(id: number) {
    const pool = (await poolPromise) as ConnectionPool;
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .query(`SELECT * FROM book_tbl WHERE id = @id`);

    return result.recordset;
  }

  async borrowBook(studentId: number, bookId: number) {
    const pool = (await poolPromise) as ConnectionPool;
    const result = await pool
      .request()
      .input("studentId", sql.Int, studentId)
      .input("bookId", sql.Int, bookId).query(`
        INSERT INTO borrowed_books_tbl (student_id, book_id, borrow_date)
        VALUES (@studentId, @bookId, GETDATE());
      `);

    return result;
  }

  async returnBook(studentId: number, bookId: number) {
    const pool = (await poolPromise) as ConnectionPool;
    const result = await pool
      .request()
      .input("studentId", sql.Int, studentId)
      .input("bookId", sql.Int, bookId).query(`
        DELETE FROM borrowed_books_tbl
        WHERE student_id = @studentId AND book_id = @bookId;
      `);

    return result;
  }
}

export { studentRepo };
