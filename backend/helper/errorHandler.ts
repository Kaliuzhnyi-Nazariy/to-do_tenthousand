import { ExtendedError } from "../interfaces/Error";

const errorMessages: Record<number, string> = {
  400: "Bad request!",
  401: "Unauthorized!",
  403: "Forbidden!",
  404: "Not found!",
  409: "Conflict!",
  500: "Server Error",
};

export const errorHandler = (
  status: number,
  message = errorMessages[status],
) => {
  const err = new Error(message) as ExtendedError;
  err.code = status;
  return err;
};
