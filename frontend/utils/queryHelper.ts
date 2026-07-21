import { ReadonlyURLSearchParams } from "next/navigation";

export const getTodoQueryKey = (searchParams: ReadonlyURLSearchParams) => {
  return [
    "todoFetch",
    searchParams.get("search") || null,
    Number(searchParams.get("page")) || 1,
    searchParams.get("finished") || null,
    searchParams.get("orderby") || null,
    searchParams.get("order") || null,
  ];
};
