import { NextFunction, Request, Response } from "express";
import { ExtendedError } from "../interfaces/Error";

export const errorRoute = (
  err: ExtendedError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { message = "Server error", code = 500 } = err;
  res.status(code).json({ message });
};
