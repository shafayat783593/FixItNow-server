import { Router } from "express";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { paymentController } from "./payment.controller";








const router = Router()




router.post("/checkout", auth(Role.CUSTOMER),paymentController.createCheckoutSession);
router.post("/webhook",paymentController.handelWebhook)
router.get("/", auth(Role.CUSTOMER), paymentController.getMyPayments);
router.get("/:id", auth(Role.CUSTOMER,Role.TECHNICIAN,Role.ADMIN), paymentController.getPaymentById);


export const paymentRouter = router