import { Router } from "express";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { categoryController } from "./category.controller";


const router = Router()
router.post("/", auth(Role.ADMIN), categoryController.createCategories)
router.get("/", categoryController.getAllCategories);

router.put("/:id", auth(Role.ADMIN), categoryController.updateCategory);
router.delete("/:id", auth(Role.ADMIN), categoryController.deleteCategory);

export const categoryRouter = router