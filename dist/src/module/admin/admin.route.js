"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
const express_1 = require("express");
const admin_controller_1 = require("./admin.controller");
const auth_1 = require("../../middleware/auth");
const enums_1 = require("../../../generated/prisma/enums");
const router = (0, express_1.Router)();
router.get("/users", (0, auth_1.auth)(enums_1.Role.ADMIN), admin_controller_1.adminController.getAllUser);
router.put("/users/:id", (0, auth_1.auth)(enums_1.Role.ADMIN), admin_controller_1.adminController.updateUser);
router.get("/bookings", (0, auth_1.auth)(enums_1.Role.ADMIN), admin_controller_1.adminController.getAllBookings);
exports.adminRouter = router;
//# sourceMappingURL=admin.route.js.map