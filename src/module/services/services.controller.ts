import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/cashAsync";
import { sendResponse } from "../../utils/sendResponse";

import  httpStatus  from "http-status";
import { service } from "./services.service";

const createService = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const technicianId = req.user?.id
    const payload = req.body
    const result = await service.createService(payload,technicianId as string)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Service created successfully",
        data:result
})
})

const getAllServices = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const quary = req.query
    const result = await service.getAllService(quary)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Service fetched successfully",
        data:result
    })
    
})



const updateAvailability = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id;
  const { slots } = req.body;

  const result = await service.updateAvailability(userId, slots);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Availability updated successfully",
    data: result,
  });
});

export const serviceController = {
    createService,
    getAllServices,
}