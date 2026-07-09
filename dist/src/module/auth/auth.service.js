"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const config_1 = __importDefault(require("../../config"));
const prisma_1 = require("../../lib/prisma");
const jwt_1 = require("../../utils/jwt");
const bcrypt_1 = __importDefault(require("bcrypt"));
const enums_1 = require("../../../generated/prisma/enums");
const userRegisterInDB = async (payload) => {
    const { name, email, password, phone, role } = payload;
    const isUserExist = await prisma_1.prisma.user.findUnique({
        where: { email },
    });
    if (isUserExist) {
        throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt_1.default.hash(password, Number(config_1.default.bcrypt_salt_rounds));
    const result = await prisma_1.prisma.$transaction(async (tex) => {
        const createdUser = await prisma_1.prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                phone,
                role: role || enums_1.Role.CUSTOMER,
            },
        });
        if (createdUser.role === "TECHNICIAN") {
            await tex.technicianProfile.create({
                data: {
                    userId: createdUser.id,
                    bio: "",
                    experience: 0,
                    location: "",
                }
            });
        }
        return await tex.user.findUnique({
            where: { id: createdUser.id },
            omit: {
                password: true,
            },
            include: {
                technicianProfile: true,
            },
        });
    });
    return result;
};
const userLoginInDB = async (payload) => {
    const { email, password } = payload;
    const user = await prisma_1.prisma.user.findUniqueOrThrow({
        where: { email }
    });
    const IsPasswordMatch = await bcrypt_1.default.compare(password, user.password);
    if (!IsPasswordMatch) {
        throw new Error("Password is Incorrected");
    }
    const jwtPayload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
    };
    const accessToken = await (0, jwt_1.createToken)(jwtPayload, config_1.default.jwt_accessToken, config_1.default.jwt_accessToken_Expire);
    const refreshToken = await (0, jwt_1.createToken)(jwtPayload, config_1.default.jwt_refreshToken, config_1.default.jwt_refreshToken_Expire);
    return {
        accessToken,
        refreshToken
    };
};
const refreshTokenSave = async (token) => {
    const veryToken = await (0, jwt_1.veryfyToken)(token, config_1.default.jwt_refreshToken);
    if (!veryToken.success) {
        throw new Error("Token is not valied");
    }
    const { id } = veryToken.data;
    const user = await prisma_1.prisma.user.findUniqueOrThrow({
        where: { id }
    });
    const jwtPayload = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
    };
    const accessToken = await (0, jwt_1.createToken)(jwtPayload, config_1.default.jwt_accessToken, config_1.default.jwt_accessToken_Expire);
    return {
        accessToken
    };
};
const getCurrentLoginUser = async (userId) => {
    console.log("userId.................................", userId);
    const user = await prisma_1.prisma.user.findFirstOrThrow({
        where: {
            id: userId
        },
        include: {
            technicianProfile: true,
            bookingsAsCustomer: true,
            reviews: true
        }
    });
    if (user.role === enums_1.Role.TECHNICIAN) {
        return user;
    }
    const { technicianProfile, ...rest } = user;
    return rest;
};
exports.authService = {
    userRegisterInDB,
    userLoginInDB,
    refreshTokenSave,
    getCurrentLoginUser
};
//# sourceMappingURL=auth.service.js.map