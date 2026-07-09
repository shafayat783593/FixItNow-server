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




const updateUser = catchAsync( async (req: Request, res: Response) => {
    const {id}= req.params

    const result = await adminService.updateUser(id as string, req.body);
     sendResponse(res, {
        success: true,
        statusCode: statusCode.OK,
        message: "User updated successfully",
        data:result
    })
})

const getAllBookings = catchAsync(async (req: Request, res: Response) => {
    const quary = req.query
  const result = await adminService.getAllBookings(quary);
  sendResponse(res, {
    success: true,
    statusCode: statusCode.OK,
    message: "Bookings retrieved successfully",
    data: result,
  });
});
export const adminController = {
    getAllUser,
    updateUser,
    getAllBookings
}