"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentController = void 0;
const cashAsync_1 = require("../../utils/cashAsync");
const payment_service_1 = require("./payment.service");
const sendResponse_1 = require("../../utils/sendResponse");
const http_status_1 = __importDefault(require("http-status"));
const createCheckoutSession = (0, cashAsync_1.catchAsync)(async (req, res) => {
    const userId = req.user?.id;
    const { bookingId } = req.body;
    const result = await payment_service_1.paymentService.createCheckoutSession(userId, bookingId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Checkout session created successfully",
        data: result,
    });
});
const handelWebhook = (0, cashAsync_1.catchAsync)(async (req, res, next) => {
    const event = req.body;
    console.log(event);
    const signature = req.headers["stripe-signature"];
    console.log(signature);
    await payment_service_1.paymentService.handelWebhook(event, signature);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Webhook tiggered successfully",
        data: null,
    });
});
const getMyPayments = (0, cashAsync_1.catchAsync)(async (req, res) => {
    const userId = req.user?.id;
    const payments = await payment_service_1.paymentService.getMyPayments(userId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Payments retrieved successfully",
        data: payments,
    });
});
const getPaymentById = (0, cashAsync_1.catchAsync)(async (req, res) => {
    const useId = req.user?.id;
    const paymentId = req.params.id;
    const payment = await payment_service_1.paymentService.getPaymentById(paymentId, useId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Payment retrieved successfully",
        data: payment,
    });
});
exports.paymentController = {
    createCheckoutSession,
    handelWebhook,
    getMyPayments,
    getPaymentById,
};
//# sourceMappingURL=payment.controller.js.map