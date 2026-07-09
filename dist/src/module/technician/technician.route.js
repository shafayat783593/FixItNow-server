"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.technicianRouter = void 0;
const express_1 = require("express");
const technician_controller_1 = require("./technician.controller");
const auth_1 = require("../../middleware/auth");
const enums_1 = require("../../../generated/prisma/enums");
const router = (0, express_1.Router)();
router.get("/bookings", (0, auth_1.auth)(enums_1.Role.TECHNICIAN), technician_controller_1.technicianController.getTechnicianBooking);
router.get("/", technician_controller_1.technicianController.getAllTechnicians);
router.put("/availability", (0, auth_1.auth)(enums_1.Role.TECHNICIAN), technician_controller_1.technicianController.updateAvailability); // ✅ /:id এর আগে
router.get("/:id", technician_controller_1.technicianController.getTechnicianById);
router.put("/:id", (0, auth_1.auth)(enums_1.Role.TECHNICIAN), technician_controller_1.technicianController.updateTechnicianProfile);
router.patch("/bookings/:id", (0, auth_1.auth)(enums_1.Role.TECHNICIAN), technician_controller_1.technicianController.updateBookingStatus);
exports.technicianRouter = router;
//# sourceMappingURL=technician.route.js.map