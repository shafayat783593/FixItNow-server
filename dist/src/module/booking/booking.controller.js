"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingController = void 0;
const cashAsync_1 = require("../../utils/cashAsync");
const booking_service_1 = require("./booking.service");
const sendResponse_1 = require("../../utils/sendResponse");
const http_status_1 = __importDefault(require("http-status"));
const createBooking = (0, cashAsync_1.catchAsync)(async (req, res, next) => {
    const customerId = req.user?.id;
    const payload = req.body;
    const result = await booking_service_1.bookingService.createBooking(customerId, payload);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Booking create successfully ",
        data: result
    });
});
const getMyBookings = (0, cashAsync_1.catchAsync)(async (req, res, next) => {
    const customerId = req.user?.id;
    const result = await booking_service_1.bookingService.getMyBookings(customerId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Booking create successfully ",
        data: result
    });
});
const getBookingById = (0, cashAsync_1.catchAsync)(async (req, res, next) => {
    const bookingId = req.params.id;
    const result = await booking_service_1.bookingService.getBookingById(bookingId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Booking create successfully ",
        data: result
    });
});
const cancelBooking = (0, cashAsync_1.catchAsync)(async (req, res, next) => {
    const customerId = req.user?.id;
    const bookingId = req.params.id;
    const result = await booking_service_1.bookingService.cancelBooking(customerId, bookingId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Booking create successfully ",
        data: result
    });
});
exports.bookingController = {
    createBooking,
    getMyBookings,
    getBookingById,
    cancelBooking,
};
//# sourceMappingURL=booking.controller.js.map