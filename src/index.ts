import express from "express";
import errorMiddleware from "./middleware/Error";
import notFound from "./middleware/NotFound";
import authenticationRouter from "./routes/authenticationRouter";
import blogRouter from "./routes/blogRouter";
import commentRouter from "./routes/commentRouter";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/static", express.static(path.join(__dirname, "/uploads/banner")));

// route
app.use("/auth", authenticationRouter);
app.use("/api", blogRouter);
app.use("/api", commentRouter);

app.use(errorMiddleware);
app.use("*", notFound);

app.listen(PORT, () => console.log(`Server Running On Port ${PORT}`));
