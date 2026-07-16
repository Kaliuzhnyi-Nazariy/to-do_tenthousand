import db from "./init";

const initDb = async () => {
  try {
    await db.query(`
        CREATE TABLE IF NOT EXISTS todos (
            id SERIAL PRIMARY KEY NOT NULL,
            todo TEXT NOT NULL,
            status BOOLEAN DEFAULT false,
            priority INT NOT NULL CHECK (priority BETWEEN 1 AND 10),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        `);

    console.log("db created!");
  } catch (error) {
    console.log(error);
  }
};

export default initDb;
