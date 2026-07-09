"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../../middleware/auth");
const enums_1 = require("../../../generated/prisma/enums");
const payment_controller_1 = require("./payment.controller");
const router = (0, express_1.Router)();
router.post("/checkout", (0, auth_1.auth)("CUSTOMER"), payment_controller_1.paymentController.createCheckoutSession);
router.post("/webhook", payment_controller_1.paymentController.handelWebhook);
router.get("/", (0, auth_1.auth)(enums_1.Role.CUSTOMER), payment_controller_1.paymentController.getMyPayments);
router.get("/:id", (0, auth_1.auth)(enums_1.Role.CUSTOMER, enums_1.Role.TECHNICIAN, enums_1.Role.ADMIN), payment_controller_1.paymentController.getPaymentById);
exports.paymentRouter = router;
//# sourceMappingURL=payment.route.js.map