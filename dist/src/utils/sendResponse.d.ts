import { Response } from "express";
type TMeta = {
    page: number;
    limit: number;
    total: number;
};
type TResponseData<T> = {
    success: boolean;
    message: string;
    statusCode: number;
    data: T;
    meta?: TMeta;
};
export declare const sendResponse: <T>(res: Response, data: TResponseData<T>) => void;
export {};
//# sourceMappingURL=sendResponse.d.ts.map