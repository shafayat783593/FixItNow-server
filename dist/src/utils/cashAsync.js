"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchAsync = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        }
        catch (error) {
            console.log(error);
            res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json({
                success: false,
                statusCode: http_status_1.default.INTERNAL_SERVER_ERROR,
                message: "Failed to register user",
                error: error.message
            });
        }
    };
};
exports.catchAsync = catchAsync;
//# sourceMappingURL=cashAsync.js.map