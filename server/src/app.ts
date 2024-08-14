import express, { Request, Response, json, urlencoded } from "express";
import cookieParser from "cookie-parser";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
// import rateLimit from "express-rate-limit";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import path from "path";

import { categoryRoute, tagRoute } from "./routes/category.route";
import { blogRoute } from "./routes/blog.route";
import { userRoute } from "./routes/user.route";
import { globalErrorHandler } from "./controllers/errorController";

const app = express();

app.use(cors());
// Set security HTTP headers
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Limit requests from same API
// const limiter = rateLimit({
//   max: 100,
//   windowMs: 60 * 60 * 1000,
//   message: "Too many requests from this IP, please try again in an hour!",
// });
// app.use("/api", limiter);

// body parser middleware
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(compression());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    isActive: true,
  });
});

app.use("/assets", express.static(path.join("dist/assets")));

app.use("/api/v1/users", userRoute);
app.use("/api/v1/blogs", blogRoute);
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/tags", tagRoute);

app.use(globalErrorHandler);

export default app;
