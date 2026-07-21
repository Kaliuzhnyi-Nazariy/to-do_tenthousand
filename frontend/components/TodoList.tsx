"use client";

import { useQuery } from "@tanstack/react-query";
import { getTodos } from "../features/requests";
import { useSearchParams } from "next/navigation";
import TodoItem from "./TodoItem";
import PaginationComponent from "./Pagination";
import { Spinner } from "./ui/spinner";
import { getTodoQueryKey } from "@/utils/queryHelper";

const TodoList = () => {
  const searchParams = useSearchParams();

  const paramsSearch = searchParams.get("search") || null;
  const paramsOrderBy = searchParams.get("orderby") || null;
  const paramsOrder = searchParams.get("order") || null;
  const paramsIsFinished = searchParams.get("finished") || null;
  const paramsPage = Number(searchParams.get("page")) || 1;

  const { data, isFetched } = useQuery({
    queryKey: getTodoQueryKey(searchParams),
    queryFn: () =>
      getTodos({
        search: paramsSearch,
        orderBy: paramsOrderBy,
        order: paramsOrder as "ASC" | "DESC",
        isFinished: paramsIsFinished,
        page: paramsPage,
      }),
    retry: false,
    staleTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
  });

  const page = Math.ceil(data?.meta.allTodos / data?.meta.limit);

  if (!isFetched)
    return (
      <div className="flex items-center justify-center flex-1">
        <Spinner />
      </div>
    );

  return (
    <div className="flex flex-col flex-1 min-h-0 w-full mt-2">
      {data && data?.todos.length > 0 ? (
        <ul className="flex flex-col flex-1 min-h-0 gap-3 list-none w-full overflow-auto">
          {data.todos.map(
            ({
              id,
              todo,
              status,
              priority,
              created_at,
            }: {
              id: number;
              todo: string;
              status: boolean;
              priority: number;
              created_at: string;
            }) => {
              return (
                <TodoItem
                  key={id}
                  id={id}
                  created_at={created_at}
                  priority={priority}
                  status={status}
                  todo={todo}
                />
              );
            },
          )}
        </ul>
      ) : (
        <div className="flex items-center justify-center flex-1">
          <p>No TO-DOs</p>
        </div>
      )}
      {page > 0 && <PaginationComponent pages={page} />}
    </div>
  );
};

export default TodoList;
