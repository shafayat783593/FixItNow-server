import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/cashAsync";
import { sendResponse } from "../../utils/sendResponse";
import { technicianService } from "./technician.service";
import httpStatus from "http-status";
const getAllTechnicians = catchAsync(async (req, res, next) => {
    const query = req.query
    const result = await technicianService.getAllTechnicians(query)
    sendResponse
        (res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Technician fetched successfully",
        data:result
    })


})


const getTechnicianById = catchAsync(async (req: Request, res:Response, next:NextFunction) => {
    const { id } = req.params
    const result = await technicianService.getTechnicianById(id as string)   
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Technician fetched successfully",
        data: result
    })
})


const updateTechnicianProfile = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
    const { id } = req.params
    const updateData = req.body
    const result = await technicianService.updateTechnicianProfile(id as string, updateData)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Technician profile updated successfully",
        data: result
    })
})

const getTechnicianBooking = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const technicId = req.user?.id
    
    const result = await technicianService.getTechnicianBooking(technicId as string)
    console.log(result)
      sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Booking data retrive successfully ",
        data: result
      })
    
    
    
})


// technician.controller.ts

const updateBookingStatus = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { id } = req.params;
  const { action } = req.body; // "ACCEPTED" or "DECLINED"

    const result  = await technicianService.updateupdateTechnicianBookingStatus(userId as string, id as string, action);
      sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Booking  status update successfully  ",
        data: result
      })
});


export const technicianController = {
    getAllTechnicians,
    getTechnicianById,
    updateTechnicianProfile,
    getTechnicianBooking,
    updateBookingStatus
}