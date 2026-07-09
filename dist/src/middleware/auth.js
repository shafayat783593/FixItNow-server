"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const cashAsync_1 = require("../utils/cashAsync");
const jwt_1 = require("../utils/jwt");
const config_1 = __importDefault(require("../config"));
const prisma_1 = require("../lib/prisma");
const auth = (...requiredRoles) => {
    return (0, cashAsync_1.catchAsync)(async (req, res, next) => {
        const token = req.cookies.accessToken ? req.cookies.accessToken :
            req.headers.authorization?.startsWith("Bearer") ?
                req.headers.authorization?.split(" ")[1] :
                req.headers.authorization;
        console.log("token", token);
        if (!token) {
            throw new Error("You are not logged in . please log in to get access");
        }
        const verifyToken = await (0, jwt_1.veryfyToken)(token, config_1.default.jwt_accessToken);
        console.log("verifyToken", verifyToken);
        if (!verifyToken.success) {
            throw new Error(verifyToken.error);
        }
        const { id, email, role } = verifyToken.data;
        console.log(id, email, role);
        if (requiredRoles.length && !requiredRoles.includes(role)) {
            throw new Error("You do not have permission to perform this action");
        }
        const user = await prisma_1.prisma.user.findUnique({
            where: {
                id,
                email,
                role
            }
        });
        if (!user) {
            throw new Error("User not found");
        }
        if (user.status === "BANNED") {
            throw new Error("You are blocked by admin. Please contact admin to get access");
        }
        req.user = user;
        next();
    });
};
exports.auth = auth;
//# sourceMappingURL=auth.js.map