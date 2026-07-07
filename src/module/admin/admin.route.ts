import { Router } from "express";
import { adminController } from "./admin.controller";


const router = Router()
router.get("/users", adminController.getAllUser)
router.get("/user/:id", adminController.updateUser)

export const adminRouter = router
