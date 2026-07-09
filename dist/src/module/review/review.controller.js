"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewController = void 0;
const cashAsync_1 = require("../../utils/cashAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const http_status_1 = __importDefault(require("http-status"));
const review_service_1 = require("./review.service");
const giveReviewOnTechnician = (0, cashAsync_1.catchAsync)(async (req, res, next) => {
    const userId = req.user?.id;
    const { comment, rating, bookingId } = req.body;
    console.log(req.body);
    const result = await review_service_1.reviewService.giveReviewOnTechnician(userId, bookingId, rating, comment);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Successfully give review",
        data: result
    });
});
exports.reviewController = {
    giveReviewOnTechnician
};
//# sourceMappingURL=review.controller.js.map