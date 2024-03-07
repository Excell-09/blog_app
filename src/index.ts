import express from "express";
import errorMiddleware from "./middleware/Error";
import notFound from "./middleware/NotFound";
import authenticationRouter from "./routes/authenticationRouter";
import blogRouter from "./routes/blogRouter";
import path from "path";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/static", express.static(path.join(__dirname, "/uploads/banner")));

// route
app.use("/auth", authenticationRouter);
app.use("/api", blogRouter);

app.use(errorMiddleware);
app.use("*", notFound);

app.listen(PORT, () => console.log(`Server Running On Port ${PORT}`));
