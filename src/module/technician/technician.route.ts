import { Router } from "express";
import { technicianService } from "./technician.service";
import { technicianController } from "./technician.controller";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";



const router = Router()

router.get("/bookings",auth(Role.TECHNICIAN), technicianController.getTechnicianBooking)
router.get("/", technicianController.getAllTechnicians)
router.get("/:id", technicianController.getTechnicianById)
router.put("/:id", auth(Role.TECHNICIAN), technicianController.updateTechnicianProfile)

router.patch("/bookings/:id",auth(Role.TECHNICIAN),technicianController.updateBookingStatus)
export const technicianRouter = router