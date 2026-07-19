import db from "../db/init";

const getToDo = async ({
  search,
  orderBy = "created_at",
  order = "DESC",
  isFinished,
  page,
}: {
  search: string | null;
  orderBy: string | null;
  order: "ASC" | "DESC";
  isFinished?: boolean;
  page: number;
}) => {
  const LIMIT = 5;
  const offset = (page - 1) * LIMIT;

  const count = (
    await db.query(
      "SELECT COUNT (*) FROM todos  WHERE ($1::text IS NULL OR todo ILIKE '%'|| $1::text || '%') AND ($2::boolean IS NULL OR status = $2::boolean)",
      [search, isFinished],
    )
  ).rows[0].count;

  const todos = (
    await db.query(
      `SELECT * FROM todos 
 WHERE ($1::text IS NULL OR todo LIKE '%'|| $1::text || '%') 
   AND ($2::boolean IS NULL OR status = $2::boolean) 
 ORDER BY ${orderBy} ${order} 
 LIMIT $4 OFFSET $3`,
      [search, isFinished, offset, LIMIT],
    )
  ).rows;

  return {
    todos,
    meta: {
      limit: LIMIT,
      allTodos: Number(count),
    },
  };
};

const addToDo = async ({
  todo,
  priority,
}: {
  todo: string;
  priority: number;
}) => {
  return (
    await db.query(
      "INSERT INTO todos (todo, priority) VALUES ($1, $2) RETURNING *",
      [todo, priority],
    )
  ).rows;
};

const updateToDo = async ({ id }: { id: string }) => {
  return (
    await db.query(
      "UPDATE todos SET status = NOT status WHERE id = $1 RETURNING *",
      [id],
    )
  ).rows;
};

export default {
  getToDo,
  addToDo,
  updateToDo,
};
