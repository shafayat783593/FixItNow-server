"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../../middleware/auth");
const enums_1 = require("../../../generated/prisma/enums");
const category_controller_1 = require("./category.controller");
const router = (0, express_1.Router)();
router.post("/", (0, auth_1.auth)(enums_1.Role.ADMIN), category_controller_1.categoryController.createCategories);
router.get("/", category_controller_1.categoryController.getAllCategories);
exports.categoryRouter = router;
//# sourceMappingURL=category.route.js.map