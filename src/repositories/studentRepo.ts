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

  async viewBook() {
    const pool = (await poolPromise) as ConnectionPool;
    const result = await pool.request().query(`SELECT * FROM book_tbl`);
    console.log(result);

    return result.recordset;
  }

  async borrowBook(studentId: number, bookId: number) {
    const pool = (await poolPromise) as ConnectionPool;
    const result = await pool
      .request()
      .input("student_id", sql.Int, studentId)
      .input("book_id", sql.Int, bookId).query(`
        INSERT INTO borrowed_books_tbl (student_id, book_id, borrow_date)
        VALUES (@student_id, @book_id, GETDATE());
      `);

    return result;
  }

  async returnBook(student_id: number, book_id: number) {
    const pool = (await poolPromise) as ConnectionPool;
    const result = await pool
      .request()
      .input("student_id", sql.Int, student_id)
      .input("book_id", sql.Int, book_id).query(`
        DELETE FROM borrowed_books_tbl
        WHERE student_id = @student_id AND book_id = @book_id;
      `);

    return result;
  }
}

export { studentRepo };
