import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/cashAsync";
import { adminService } from "./admin.service";
import { sendResponse } from "../../utils/sendResponse";
import statusCode from "http-status"

const getAllUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const quary = req.query;
    const result = await adminService.getAllUser(quary)
    sendResponse(res, {
        success: true,
        statusCode: statusCode.OK,
        message: "User get successfully",
        data:result
    })
})




const updateUser =catchAsync( async (req: Request, res: Response) => {
    const { userId } = req.params;

    const result = await adminService.updateUser(userId as string, req.body);
     sendResponse(res, {
        success: true,
        statusCode: statusCode.OK,
        message: "User updated successfully",
        data:result
    })
})
export const adminController = {
    getAllUser,
    updateUser,
}