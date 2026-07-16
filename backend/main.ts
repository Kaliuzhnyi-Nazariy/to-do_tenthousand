import app from "./app";
import dotenv from "dotenv";
import initDb from "./db/createDB";

dotenv.config();

const { PORT } = process.env;

initDb()
  .then(() => {
    try {
      app.listen(PORT);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  })
  .catch((err) => {
    console.log("DB connection error: ", err);
  });
