import { NextFunction, Request, Response } from "express";
import { ctrlWrapper, errorHandler } from "../helper";
import service from "../service/toDo";

const getToDo = async (req: Request, res: Response, next: NextFunction) => {
  const { search, filter, isFinished, page, filterBy } = req.query;

  if (!page) return errorHandler(404, "Page is required");

  let isFinishedBool: boolean | undefined = undefined;
  if (isFinished === "true") isFinishedBool = true;
  if (isFinished === "false") isFinishedBool = false;

  const response = await service.getToDo({
    search: search as string | null,
    filterBy: filterBy as string | null,
    filter: filter as "ASC" | "DESC",
    isFinished: isFinishedBool,
    page: Number(page),
  });

  res.status(200).json(response);
};

const addToDo = async (req: Request, res: Response, next: NextFunction) => {
  const response = await service.addToDo(req.body);

  return res.status(201).json(response);
};

const updateToDo = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  if (!id) return errorHandler(404, "to-do is not found");

  const toDoId = typeof id !== "string" ? id[0] : id;

  const response = await service.updateToDo({ id: toDoId });

  res.status(200).json(response);
};

export default {
  getToDo: ctrlWrapper(getToDo),
  addToDo: ctrlWrapper(addToDo),
  updateToDo: ctrlWrapper(updateToDo),
};
