import { Router } from "express";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { categoryController } from "./category.controller";


const router = Router()
router.post("/", auth(Role.ADMIN), categoryController.createCategories)
router.get("/categories", auth(Role.ADMIN), );

export const categoryRouter = router