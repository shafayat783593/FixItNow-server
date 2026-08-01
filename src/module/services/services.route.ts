import { Router } from "express";
import { Role } from "../../../generated/prisma/client";
import { auth } from "../../middleware/auth";
import { serviceController } from "./services.controller";

const router = Router();

router.post("/", auth(Role.TECHNICIAN), serviceController.createService);

router.get("/", serviceController.getAllServices);
router.get("/my-services", auth(Role.TECHNICIAN), serviceController.getMyServices); // এখন :id এর আগে
router.get("/:id", serviceController.getServiceById);

router.patch("/:id", auth(Role.TECHNICIAN), serviceController.updateService);

export const serviceRouter = router;