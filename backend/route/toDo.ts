import { Router } from "express";
import ctrl from "../controller/toDo";
import { validate } from "../helper";
import { todoValidation } from "../validations/toDo.validation";

const router = Router();

router.get("/todo", ctrl.getToDo);

router.post("/todo", validate(todoValidation), ctrl.addToDo);

router.patch("/todo/status/:id", ctrl.updateToDo);

export default router;
