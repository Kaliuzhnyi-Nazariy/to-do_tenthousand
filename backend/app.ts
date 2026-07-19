import express from "express";
import cors from "cors";
import toDORoute from "./route/toDo";
import { errorRoute } from "./route/errorRoute";
import { NotFoundError } from "./route/notFoundError";

const app = express();

const { FRONTEND_URL } = process.env;

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", FRONTEND_URL!],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  }),
);

app.use("/api", toDORoute);

app.use(NotFoundError);

app.use(errorRoute);

export default app;
