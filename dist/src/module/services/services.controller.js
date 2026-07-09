"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceController = void 0;
const cashAsync_1 = require("../../utils/cashAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const http_status_1 = __importDefault(require("http-status"));
const services_service_1 = require("./services.service");
const createService = (0, cashAsync_1.catchAsync)(async (req, res, next) => {
    const technicianId = req.user?.id;
    const payload = req.body;
    const result = await services_service_1.service.createService(payload, technicianId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Service created successfully",
        data: result
    });
});
const getAllServices = (0, cashAsync_1.catchAsync)(async (req, res, next) => {
    const quary = req.query;
    const result = await services_service_1.service.getAllService(quary);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Service fetched successfully",
        data: result
    });
});
exports.serviceController = {
    createService,
    getAllServices,
};
//# sourceMappingURL=services.controller.js.map