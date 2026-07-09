import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
export declare const createToken: (payload: JwtPayload, secret: string, expiresIn: SignOptions) => Promise<string>;
export declare const veryfyToken: (token: string, secret: string) => Promise<{
    success: boolean;
    data: string | jwt.JwtPayload;
    error?: undefined;
} | {
    success: boolean;
    error: any;
    data?: undefined;
}>;
//# sourceMappingURL=jwt.d.ts.map