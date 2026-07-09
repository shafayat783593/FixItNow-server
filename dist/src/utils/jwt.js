"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.veryfyToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createToken = async (payload, secret, expiresIn) => {
    const token = await jsonwebtoken_1.default.sign(payload, secret, { expiresIn });
    return token;
};
exports.createToken = createToken;
const veryfyToken = async (token, secret) => {
    try {
        const verifiedToken = await jsonwebtoken_1.default.verify(token, secret);
        return {
            success: true,
            data: verifiedToken
        };
    }
    catch (error) {
        console.log("Token verification error:", error.message);
        return {
            success: false,
            error: error.message
        };
    }
};
exports.veryfyToken = veryfyToken;
//# sourceMappingURL=jwt.js.map