"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryController = void 0;
const cashAsync_1 = require("../../utils/cashAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const http_status_1 = __importDefault(require("http-status"));
const category_service_1 = require("./category.service");
const createCategories = (0, cashAsync_1.catchAsync)(async (req, res, next) => {
    const { name, description } = req.body;
    const result = await category_service_1.categoryService.createCategories(name, description);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Create ategories successfully",
        data: result
    });
});
const getAllCategories = (0, cashAsync_1.catchAsync)(async (req, res, next) => {
    const query = req.query;
    const result = await category_service_1.categoryService.getAllCategories(query);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Categories retrieved successfully",
        data: result
    });
});
exports.categoryController = {
    createCategories,
    getAllCategories
};
//# sourceMappingURL=category.controller.js.map