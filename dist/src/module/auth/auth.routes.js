"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const enums_1 = require("../../../generated/prisma/enums");
const auth_1 = require("../../middleware/auth");
const router = (0, express_1.Router)();
router.post("/register", auth_controller_1.authController.registerUser);
router.post("/login", auth_controller_1.authController.loginUser);
router.post("/refresh-token", auth_controller_1.authController.refreshToken);
router.get("/me", (0, auth_1.auth)(enums_1.Role.CUSTOMER, enums_1.Role.TECHNICIAN, enums_1.Role.ADMIN), auth_controller_1.authController.getCurrentUser);
exports.authRouter = router;
//# sourceMappingURL=auth.routes.js.map