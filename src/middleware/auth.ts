import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../utils/cashAsync"
import { veryfyToken } from "../utils/jwt";
import config from "../config";
import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../lib/prisma";
import { Role } from "../../generated/prisma/enums";


declare global {
    namespace Express {
        interface Request {
            user?: {
                email: string,
                name: string,
                id: string,
                role: Role,
                
            }
        }
    }
}


export const auth = (...requiredRoles: string[]) => {
    console.log("requiredRoles,",requiredRoles)
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        
        const token = req.cookies.accessToken ? req.cookies.accessToken :
            req.headers.authorization?.startsWith("Bearer") ?
                req.headers.authorization?.split(" ")[1] :
                req.headers.authorization;


        console.log("token", token)
        if (!token) {
            throw new Error("You are not logged in . please log in to get access")
        }

        const verifyToken = await veryfyToken(token, config.jwt_accessToken)
        console.log("verifyToken", verifyToken)
        if (!verifyToken.success) {
            throw new Error(verifyToken.error);
        }
        const { id, email, role } = verifyToken.data as JwtPayload
        console.log(id, email, role)
        if (requiredRoles.length && !requiredRoles.includes(role)) {
            throw new Error("You do not have permission to perform this action");

        }
        const user = await prisma.user.findUnique({
            where: {
                id,
                email,
                role
            }
        })
         if (!user) {
            throw new Error("User not found")
        }
        if (user.status === "BANNED") {
                throw new Error("You are blocked by admin. Please contact admin to get access")
         
        }
        req.user = user
        next()



    })

}