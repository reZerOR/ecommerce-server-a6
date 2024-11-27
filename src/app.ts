import { Status } from "better-status-codes";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import notFound from "./app/middlewares/notFound";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import router from "./app/routes";
const app: Application = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", router);

app.get("/", (_req: Request, res: Response) => {
  res.status(Status.OK).json({
    success: true,
    message: "welcome to the server",
  });
});
app.use(globalErrorHandler);
app.use(notFound);

export default app;
