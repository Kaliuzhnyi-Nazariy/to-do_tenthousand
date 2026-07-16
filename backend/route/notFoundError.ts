import { Request, Response } from "express";

export const NotFoundError = (req: Request, res: Response) => {
  res.status(404).json({ message: "Route is not found" });
};
