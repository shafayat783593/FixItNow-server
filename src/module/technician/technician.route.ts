import { Router } from "express";
import { technicianService } from "./technician.service";
import { technicianController } from "./technician.controller";



const router = Router()

router.get("/", technicianController.getAllTechnicians)
router.get("/:id", technicianController.getTechnicianById)


export const technicianRouter = router