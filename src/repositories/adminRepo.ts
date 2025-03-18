import { ConnectionPool, IResult } from "mssql";
import { poolPromise, sql } from "../config/database";
import { Book } from "../models/bookModel";

class AdminRepository {
  async addBook(title: string, author: string, price: number) {
    const pool = (await poolPromise) as ConnectionPool;

    const result: IResult<Book> = await pool
      .request()
      .input("title", sql.VarChar, title)
      .input("author", sql.VarChar, author)
      .input("price", sql.Numeric, price)
      .query(
        "insert into book_tbl (title,author,price) values(@title,@author,@price)"
      );

    console.log(result);

    return result;
  }

  async updateBook(book: Book) {
    const pool = (await poolPromise) as ConnectionPool;
    const result = await pool
      .request()
      .input("title", sql.VarChar, book.title)
      .input("author", sql.VarChar, book.author)
      .input("price", sql.Numeric, book.price)
      .query(
        `update book_tbl set title=@title, author=@author, price=@price where id=${book.id}`
      );
    return result;
  }

  async deleteBook(id: number) {
    const pool = (await poolPromise) as ConnectionPool;
    const result = await pool
      .request()
      .query(`delete from book_tbl where id=${id}`);
    return result;
  }
}

export { AdminRepository };
