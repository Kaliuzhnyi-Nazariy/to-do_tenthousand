import { api } from "./api";

const rootURL = "/todo";

export const getTodos = async ({
  search,
  orderBy,
  order,
  isFinished,
  page = 1,
}: {
  search?: string | null;
  orderBy?: string | null;
  order?: "ASC" | "DESC";
  isFinished?: string | null;
  page: number;
}) => {
  // console.log({ orderBy });

  return (
    await api.get(rootURL, {
      params: {
        search: search ?? null,
        orderBy: orderBy ?? null,
        order: order ?? null,
        isFinished: isFinished ?? null,
        page,
      },
    })
  ).data;
};

export const createTodo = async ({
  todo,
  priority,
}: {
  todo: string;
  priority: number;
}) => {
  return (await api.post(rootURL, { todo, priority })).data;
};

export const updateTodo = async ({ id }: { id: string }) => {
  return (await api.patch(rootURL + "/status/" + id)).data;
};
