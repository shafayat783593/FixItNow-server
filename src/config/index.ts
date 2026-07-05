
import dotenv from "dotenv"
import path from "node:path"

dotenv.config({
    path: path.join(process.cwd(), ".env")
});



export default {
    port: process.env.PORT || 5000,
    database_url: process.env.DATABASE_URL,
    app_url: process.env.APP_URL,
    bcrypt_salt_rounds: process.env.BCRYPTSALT_ROUNDS,
    jwt_accessToken: process.env.JWR_ACCESSTOKEN!,
    jwt_refreshToken: process.env.JWT_REFRESHTOKEN!,
    jwt_accessToken_Expire:process.env.JWT_ACCESSTOKEN_EXPIRE,
    jwt_refreshToken_Expire:process.env.JWT_REFRESHTOKEN_EXPIRE
    
}