"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../../middleware/auth");
const enums_1 = require("../../../generated/prisma/enums");
const booking_controller_1 = require("./booking.controller");
const router = (0, express_1.Router)();
router.post("/", (0, auth_1.auth)(enums_1.Role.CUSTOMER), booking_controller_1.bookingController.createBooking);
router.get("/", (0, auth_1.auth)(enums_1.Role.CUSTOMER), booking_controller_1.bookingController.getMyBookings);
router.get("/:id", (0, auth_1.auth)(enums_1.Role.ADMIN, enums_1.Role.CUSTOMER, enums_1.Role.TECHNICIAN), booking_controller_1.bookingController.getBookingById);
router.patch("/:id/cancel", (0, auth_1.auth)("CUSTOMER"), booking_controller_1.bookingController.cancelBooking);
exports.bookingRouter = router;
//# sourceMappingURL=booking.route.js.map