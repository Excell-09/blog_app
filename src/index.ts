import express from "express";
import errorMiddleware from "./middleware/Error";
import notFound from "./middleware/NotFound";

const app = express();
const PORT = 3000;

app.use(errorMiddleware);
app.use("*", notFound);

app.listen(PORT, () => console.log(`Server Running On Port ${PORT}`));
