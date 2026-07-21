"use client";

import { createTodo } from "@/features/requests";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Spinner } from "@/components/ui/spinner";
import InputComponent from "./Input";
import { toastError, toastSuccess } from "@/lib/toast";
import type { AxiosError } from "axios";

interface IToDo {
  todo: string;
  priority: number;
}

const CreateTodo = ({ closeModal }: { closeModal: () => void }) => {
  const validation = z.object({
    todo: z.string().nonempty({ message: "Cannot be empty" }),
    priority: z
      .number({ message: "Cannot be empty" })
      .min(1, "Priority should be lower than 1")
      .max(10, "Priority should be higher than 11"),
  });

  const methods = useForm<IToDo>({
    mode: "all",
    resolver: zodResolver(validation),
  });

  const client = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: IToDo) => createTodo(data),
    onSuccess() {
      methods.reset({
        todo: "",
        priority: 0,
      });

      client.invalidateQueries({
        queryKey: ["todoFetch"],
      });

      closeModal();
      toastSuccess("To-do created succefully!");
    },
    onError(err: AxiosError<{ message: string }>) {
      toastError(err.response?.data.message);
    },
  });

  const handlingForm: SubmitHandler<IToDo> = (data) => {
    mutate(data);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handlingForm)}
        className="flex flex-col gap-5"
      >
        <h3 className="text-center">Create to-do</h3>
        <InputComponent<IToDo>
          label="TO-DO"
          name="todo"
          placeholder="Write TO-DO"
        />
        <InputComponent<IToDo>
          label="Priority"
          name="priority"
          placeholder="Set a priority 1-10"
          type="number"
          message="Prioruty could be between 1 and 10"
        />
        {isPending ? (
          <div className="flex items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <button
            type="submit"
            className="bg-primary text-white rounded-md py-2 uppercase font-bold cursor-pointer border border-transparent hover:border-primary hover:bg-white hover:text-primary  focus:border-primary focus:bg-white focus:text-primary  focus:outline-none transition-colors duration-200 disabled:cursor-not-allowed disabled:bg-primary/50"
            disabled={!methods.formState.isValid}
          >
            add
          </button>
        )}
      </form>
    </FormProvider>
  );
};

export default CreateTodo;
