import { ConnectionPool, MSSQLError } from "mssql";
import sql from "mssql";
const config = {
  user: "j2",
  password: "123456",
  server: "dev.c5owyuw64shd.ap-south-1.rds.amazonaws.com",
  port: 1982,
  database: "JIBE_Main_Training",
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

const poolPromise = new ConnectionPool(config)
  .connect()
  .then((pool: ConnectionPool) => {
    console.log("Connected to sql server");
    return pool;
  })
  .catch((err: MSSQLError) => console.log("Database connection failed", err));

export { poolPromise, sql };
