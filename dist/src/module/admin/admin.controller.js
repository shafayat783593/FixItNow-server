"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminController = void 0;
const cashAsync_1 = require("../../utils/cashAsync");
const admin_service_1 = require("./admin.service");
const sendResponse_1 = require("../../utils/sendResponse");
const http_status_1 = __importDefault(require("http-status"));
const getAllUser = (0, cashAsync_1.catchAsync)(async (req, res, next) => {
    const quary = req.query;
    const result = await admin_service_1.adminService.getAllUser(quary);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "User get successfully",
        data: result
    });
});
const updateUser = (0, cashAsync_1.catchAsync)(async (req, res) => {
    const { id } = req.params;
    const result = await admin_service_1.adminService.updateUser(id, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "User updated successfully",
        data: result
    });
});
const getAllBookings = (0, cashAsync_1.catchAsync)(async (req, res) => {
    const quary = req.query;
    const result = await admin_service_1.adminService.getAllBookings(quary);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Bookings retrieved successfully",
        data: result,
    });
});
exports.adminController = {
    getAllUser,
    updateUser,
    getAllBookings
};
//# sourceMappingURL=admin.controller.js.map