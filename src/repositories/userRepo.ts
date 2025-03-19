import { ConnectionPool } from "mssql";
import { poolPromise, sql } from "../config/database";

class UserRepo {
  async createUser(
    name: string,
    email: string,
    password: string,
    role: string
  ) {
    const pool = (await poolPromise) as ConnectionPool;
    const result = await pool
      .request()
      .input("name", sql.VarChar, name)
      .input("email", sql.VarChar, email)
      .input("password", sql.VarChar, password)
      .input("role", sql.VarChar, role)
      .query(
        "INSERT INTO user_tbl (name, email, password,role) VALUES (@name, @email,@password,@role)"
      );
    return result;
  }
  async getUserByEmail(email: string) {
    const pool = (await poolPromise) as ConnectionPool;
    const result = await pool
      .request()
      .input("email", sql.VarChar, email)
      .query("select * from user_tbl where email=@email");
    return result;
  }
}
export default new UserRepo();
