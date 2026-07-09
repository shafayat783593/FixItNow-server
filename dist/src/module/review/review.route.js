"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewRouter = void 0;
const express_1 = require("express");
const enums_1 = require("../../../generated/prisma/enums");
const auth_1 = require("../../middleware/auth");
const review_controller_1 = require("./review.controller");
const router = (0, express_1.Router)();
router.post("/", (0, auth_1.auth)(enums_1.Role.CUSTOMER), review_controller_1.reviewController.giveReviewOnTechnician);
exports.reviewRouter = router;
//# sourceMappingURL=review.route.js.map