import express from "express";
import { adminRouter } from "./routes/adminRoutes";
import { StudentRouter } from "./routes/studentRoutes";
import { authRouter } from "./routes/authRoutes";
const app = express();

app.use(express.json());

const port = 3000;
app.use("/api/admin", adminRouter);
app.use("/api/auth", authRouter);
app.use("/api/student", StudentRouter);
app.listen(port, () => {
  console.log(`Listening on port ${port}.....`);
});
