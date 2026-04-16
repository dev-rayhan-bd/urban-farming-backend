import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import router from "./app/routes/index";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";
import morgan from "morgan";
import { rateLimit } from "express-rate-limit";
import apiBenchmark from "./app/middleware/apiBenchmark";
import {
  authLimiter,
  commonLimiter,
 
} from "./app/middleware/rateLimiter";

const app: Application = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, //15 minutes
  max: 100, //100 req per ip
  message: "Too many requests from this IP, please try again after 15 minutes",
});

// Now apply JSON parser for all other routes
app.use(express.json());
app.use(cookieParser());

app.use(morgan("dev"));
app.use(apiBenchmark);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use(
  cors({
    origin: ["http://10.10.20.34:3000"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  }),
);

app.use("/api/v1/auth", authLimiter);
app.use("/api/v1", commonLimiter);
app.use("/api/v1", router);
app.get("/", (req: Request, res: Response) => {
  res.send("Server is Running...");
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
