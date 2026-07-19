import { updateTodo } from "@/features/requests";
import { toastError, toastSuccess } from "@/lib/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import type { AxiosError } from "axios";

const TodoItem = ({
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
  const client = useQueryClient();

  const searchParams = useSearchParams();

  const paramsSearch = searchParams.get("search") || null;
  const paramsOrderBy = searchParams.get("orderby") || null;
  const paramsOrder = searchParams.get("order") || null;
  const paramsIsFinished = searchParams.get("finished") || null;
  const paramsPage = Number(searchParams.get("page")) || 1;

  const { mutate } = useMutation({
    mutationFn: () => updateTodo({ id: String(id) }),
    onSuccess() {
      client.invalidateQueries({
        queryKey: [
          "todoFetch",
          paramsSearch,
          paramsPage,
          paramsIsFinished,
          paramsOrderBy,
          paramsOrder,
        ],
      });

      toastSuccess("To-do status updated!");
    },
    onError(err: AxiosError<{ message: string }>) {
      toastError(err.response?.data.message);
    },
  });

  return (
    <li className="block border rounded-md p-2 w-full">
      <div className="flex w-full justify-between">
        <h3>{todo}</h3>
        <p>Priority: {priority}</p>
      </div>
      <h5 className={`${status ? "text-(--success)" : "opacity-50"} text-xs `}>
        {status ? "Finished" : "In proccess"}
      </h5>
      <div className="flex items-center justify-between">
        <p className="text-xs">{new Date(created_at).toDateString()}</p>
        <button onClick={() => mutate()}>Update</button>
      </div>
    </li>
  );
};

export default TodoItem;
