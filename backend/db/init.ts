import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const { DB_CONNECTION, DB_TEST, ENVIRONMENT } = process.env;

const db = new Pool({
  connectionString: ENVIRONMENT === "production" ? DB_CONNECTION : DB_TEST,
});

export default db;
