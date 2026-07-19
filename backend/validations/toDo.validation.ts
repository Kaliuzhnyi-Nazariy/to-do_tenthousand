import z from "zod";

export const todoValidation = z.object({
  todo: z.string(),
  priority: z
    .number()
    .min(1, "Max priority is 1")
    .max(10, "Min priority is 10"),
});
