"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const node_path_1 = __importDefault(require("node:path"));
dotenv_1.default.config({
    path: node_path_1.default.join(process.cwd(), ".env")
});
exports.default = {
    port: process.env.PORT || 5000,
    database_url: process.env.DATABASE_URL,
    app_url: process.env.APP_URL,
    bcrypt_salt_rounds: process.env.BCRYPTSALT_ROUNDS,
    jwt_accessToken: process.env.JWR_ACCESSTOKEN,
    jwt_refreshToken: process.env.JWT_REFRESHTOKEN,
    jwt_accessToken_Expire: process.env.JWT_ACCESSTOKEN_EXPIRE,
    jwt_refreshToken_Expire: process.env.JWT_REFRESHTOKEN_EXPIRE,
    stripe_secret_id: process.env.STRIPE_SECRET_ID,
    stripe_webhook_secret: process.env.STRIPE_WEBHOOK_SECRET
};
//# sourceMappingURL=index.js.map