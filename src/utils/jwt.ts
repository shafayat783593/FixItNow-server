import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";


export const createToken = async (payload: JwtPayload, secret: string, expiresIn: SignOptions) => {
    const token = await jwt.sign(payload, secret, {expiresIn} as SignOptions)
    return token

}

export const veryfyToken = async (token: string, secret: string) => {
    
    try {
        const verifiedToken =  await jwt.verify(token, secret)
        return {
            success:true,
            data: verifiedToken 
        }
        
    } catch (error :any) {
        console.log("Token verification error:", error.message);
        return {
            success: false,
             error : error.message
        }
    }
}