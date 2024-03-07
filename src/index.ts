import express from "express";
import errorMiddleware from "./middleware/Error";
import notFound from "./middleware/NotFound";
import authenticationRouter from "./routes/authenticationRouter";
import blogRouter from "./routes/blogRouter";

const app = express();
const PORT = 3000;

app.use(express.json());

// route
app.use("/auth", authenticationRouter);
app.use("/api", blogRouter);

app.use(errorMiddleware);
app.use("*", notFound);

app.listen(PORT, () => console.log(`Server Running On Port ${PORT}`));
