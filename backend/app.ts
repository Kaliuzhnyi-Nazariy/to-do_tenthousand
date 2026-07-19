import express from "express";
import cors from "cors";
import toDORoute from "./route/toDo";
import { errorRoute } from "./route/errorRoute";
import { NotFoundError } from "./route/notFoundError";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  }),
);

app.use("/api", toDORoute);

app.use(NotFoundError);

app.use(errorRoute);

export default app;
