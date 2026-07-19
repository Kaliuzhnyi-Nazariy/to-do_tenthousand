"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import InputComponent from "./Input";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Search = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const filter = searchParams.get("finished");
  const orderby = searchParams.get("orderby");

  const handleQueryParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value === "all" || value === "none" || value === null || !value) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    params.set("page", "1");

    router.replace(`${pathname}?${params.toString()}`);
  };

  const methods = useForm<{ search: string }>();

  const searchValue = methods.watch("search");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleQueryParams({ search: searchValue });
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [searchValue]);

  return (
    <div className="flex flex-col w-full">
      <FormProvider {...methods}>
        <form className="flex items-center gap-1">
          {" "}
          <h5>Search: </h5>
          <InputComponent<{ search: string }> name="search" />
        </form>
      </FormProvider>

      <div className="flex gap-2 items-center mt-2">
        <h5>Filter: </h5>
        <button
          onClick={() => handleQueryParams({ finished: "all" })}
          className={`${
            !filter && "text-white bg-primary"
          } px-2 py-1 rounded-sm`}
        >
          All
        </button>
        <button
          onClick={() => handleQueryParams({ finished: "true" })}
          className={`${
            filter === "true" && "text-white bg-primary"
          } px-2 py-1 rounded-sm`}
        >
          Finished
        </button>
        <button
          onClick={() => handleQueryParams({ finished: "false" })}
          className={`${
            filter === "false" && "text-white bg-primary"
          } px-2 py-1 rounded-sm`}
        >
          In process
        </button>
      </div>

      <div className="flex gap-2 items-center mt-2">
        <h5>Order by: </h5>
        <button
          onClick={() => handleQueryParams({ orderby: "none" })}
          className={`${
            !orderby && "text-white bg-primary"
          } px-2 py-1 rounded-sm`}
        >
          None
        </button>
        <button
          onClick={() => handleQueryParams({ orderby: "created_at" })}
          className={`${
            orderby === "created_at" && "text-white bg-primary"
          } px-2 py-1 rounded-sm`}
        >
          Date
        </button>
        <button
          onClick={() => handleQueryParams({ orderby: "priority" })}
          className={`${
            orderby === "priority" && "text-white bg-primary"
          } px-2 py-1 rounded-sm`}
        >
          Priority
        </button>
      </div>

      <div className="flex justify-between items-center mt-2">
        <h5>Sort by: </h5>

        <Select
          onValueChange={(val) => {
            const value = "TO TOP" === val ? "ASC" : "DESC";
            handleQueryParams({ order: value });
          }}
        >
          <SelectTrigger className="w-32 bg-primary text-white border-2 font-semibold">
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent className="bg-white text-primary border-2">
            <SelectItem
              value="TO TOP"
              className="font-semibold text-xs data-[state=checked]:bg-primary data-[state=checked]:text-white"
            >
              TO TOP
            </SelectItem>
            <SelectItem
              value="TO BOTTOM"
              className="font-semibold text-xs data-[state=checked]:bg-primary data-[state=checked]:text-white"
            >
              TO BOTTOM
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Search;
