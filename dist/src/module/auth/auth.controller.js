"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const auth_service_1 = require("./auth.service");
const cashAsync_1 = require("../../utils/cashAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const http_status_1 = __importDefault(require("http-status"));
const registerUser = (0, cashAsync_1.catchAsync)(async (req, res, next) => {
    const payload = req.body;
    console.log(payload);
    const user = await auth_service_1.authService.userRegisterInDB(payload);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "User register successfully",
        statusCode: http_status_1.default.OK,
        data: { user }
    });
});
const loginUser = (0, cashAsync_1.catchAsync)(async (req, res) => {
    const payload = req.body;
    const { accessToken, refreshToken } = await auth_service_1.authService.userLoginInDB(payload);
    console.log(accessToken, refreshToken);
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 7
    });
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24
    });
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "login successfully",
        data: { accessToken, refreshToken },
        statusCode: http_status_1.default.OK,
    });
});
const refreshToken = (0, cashAsync_1.catchAsync)(async (req, res) => {
    const refreshtoken = req.cookies.refreshToken;
    const { accessToken } = await auth_service_1.authService.refreshTokenSave(refreshtoken);
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24
    });
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "RefreshToken is successfully",
        data: { accessToken }
    });
});
const getCurrentUser = (0, cashAsync_1.catchAsync)(async (req, res, next) => {
    const userId = req.user?.id;
    const result = await auth_service_1.authService.getCurrentLoginUser(userId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "User profile fetched successfully",
        data: result
    });
});
exports.authController = {
    registerUser,
    loginUser,
    refreshToken,
    getCurrentUser
};
//# sourceMappingURL=auth.controller.js.map