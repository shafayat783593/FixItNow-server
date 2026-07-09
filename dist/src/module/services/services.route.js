"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceRouter = void 0;
const express_1 = require("express");
const client_1 = require("../../../generated/prisma/client");
const auth_1 = require("../../middleware/auth");
const services_controller_1 = require("./services.controller");
const router = (0, express_1.Router)();
router.post("/", (0, auth_1.auth)(client_1.Role.TECHNICIAN), services_controller_1.serviceController.createService);
router.get("/", services_controller_1.serviceController.getAllServices);
exports.serviceRouter = router;
//# sourceMappingURL=services.route.js.map