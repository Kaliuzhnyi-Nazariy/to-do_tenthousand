import db from "../db/init";

const getToDo = async ({
  search,
  filterBy = "created_at",
  filter = "DESC",
  isFinished,
  page,
}: {
  search: string | null;
  filterBy: string | null;
  filter: "ASC" | "DESC";
  isFinished?: boolean;
  page: number;
}) => {
  const offset = (page - 1) * 5;

  // console.log({ search, filter, isFinished, page });

  return (
    await db.query(
      `SELECT * FROM todos 
 WHERE ($1::text IS NULL OR todo LIKE '%'|| $1::text || '%') 
   AND ($2::boolean IS NULL OR status = $2::boolean) 
 ORDER BY ${filterBy} ${filter} 
 LIMIT 5 OFFSET $3`,
      [search, isFinished, offset],
    )
  ).rows;
};

const addToDo = async ({
  title,
  priority,
}: {
  title: string;
  priority: number;
}) => {
  return (
    await db.query(
      "INSERT INTO todos (todo, priority) VALUES ($1, $2) RETURNING *",
      [title, priority],
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
