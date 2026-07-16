import { NextFunction, Request, Response } from "express";

export const ctrlWrapper = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any> | any,
) => {
  const func = async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await fn(req, res, next);
    } catch (error) {
      return next(error);
    }
  };

  return func;
};
