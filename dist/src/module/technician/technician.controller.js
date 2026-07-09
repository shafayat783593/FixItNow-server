"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.technicianController = void 0;
const cashAsync_1 = require("../../utils/cashAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const technician_service_1 = require("./technician.service");
const http_status_1 = __importDefault(require("http-status"));
const getAllTechnicians = (0, cashAsync_1.catchAsync)(async (req, res, next) => {
    const query = req.query;
    const result = await technician_service_1.technicianService.getAllTechnicians(query);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Technician fetched successfully",
        data: result
    });
});
const getTechnicianById = (0, cashAsync_1.catchAsync)(async (req, res, next) => {
    const { id } = req.params;
    const result = await technician_service_1.technicianService.getTechnicianById(id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Technician fetched successfully",
        data: result
    });
});
const updateTechnicianProfile = (0, cashAsync_1.catchAsync)(async (req, res, next) => {
    const { id } = req.params;
    const updateData = req.body;
    const result = await technician_service_1.technicianService.updateTechnicianProfile(id, updateData);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Technician profile updated successfully",
        data: result
    });
});
const getTechnicianBooking = (0, cashAsync_1.catchAsync)(async (req, res, next) => {
    const technicId = req.user?.id;
    const result = await technician_service_1.technicianService.getTechnicianBooking(technicId);
    console.log(result);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Booking data retrive successfully ",
        data: result
    });
});
// technician.controller.ts
const updateBookingStatus = (0, cashAsync_1.catchAsync)(async (req, res) => {
    const userId = req.user?.id;
    const { id } = req.params;
    const { action } = req.body;
    const result = await technician_service_1.technicianService.updateTechnicianBookingStatus(userId, id, action);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Booking  status update successfully  ",
        data: result
    });
});
const updateAvailability = (0, cashAsync_1.catchAsync)(async (req, res) => {
    const userId = req.user?.id;
    const { slots } = req.body;
    const result = await technician_service_1.technicianService.updateAvailability(userId, slots);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Availability updated successfully",
        data: result,
    });
});
exports.technicianController = {
    getAllTechnicians,
    getTechnicianById,
    updateTechnicianProfile,
    getTechnicianBooking,
    updateBookingStatus,
    updateAvailability
};
//# sourceMappingURL=technician.controller.js.map