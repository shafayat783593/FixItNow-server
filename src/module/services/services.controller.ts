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

const getServiceById = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await service.getServiceById(id as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Service fetched successfully",
    data: result,
  });
});


const updateService = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const technicianId = req.user?.id;
  const payload = req.body;

  const result = await service.updateService(id as string, technicianId as string, payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Service updated successfully",
    data: result,
  });
});




const getMyServices = catchAsync(async (req: Request, res: Response) => {
    const technicianId = req.user?.id;
    console.log(technicianId)
    const result = await service.getMyServices(technicianId as string);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Your services fetched successfully",
        data: result,
    });
});



export const serviceController = {
    createService,
    getAllServices,
    getServiceById,
    updateService,
    
    getMyServices

}