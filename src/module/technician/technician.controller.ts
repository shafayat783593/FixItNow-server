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


const getTechnicianById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

  const { id } = req.params
  console.log(id)
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
  const quary = req.query
// console.log(technicId)
    const result = await technicianService.getTechnicianBooking(technicId as string,quary)
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
  const { action } = req.body; 

    const result  = await technicianService.updateTechnicianBookingStatus(userId as string, id as string, action);
      sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Booking  status update successfully  ",
        data: result
      })
});



const updateAvailability = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { slots } = req.body;

  const result = await technicianService.updateAvailability(userId as string, slots);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Availability updated successfully",
    data: result,
  });
});

const getAvailableSlots = catchAsync(async (req: Request, res: Response) => {
  const { id: technicianId } = req.params;
  const { date, serviceId } = req.query;

  const result = await technicianService.getAvailableSlots(technicianId as string,date as string,serviceId as string
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Available slots retrieved successfully",
    data: result,
  });
});


const deleteService = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const technicianId = req.user?.id;
  const result = await technicianService.deleteService(id as string, technicianId as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Service deleted successfully",
    data: result,
  });
});

const getDashboardStats = catchAsync(async (req: Request, res: Response) => {
    const technicianId = req.user?.id;
    const result = await technicianService.getDashboardStats(technicianId as string);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Dashboard stats retrieved successfully",
        data: result,
    });
});


export const technicianController = {
    getAllTechnicians,
    getTechnicianById,
    updateTechnicianProfile,
    getTechnicianBooking,
    updateBookingStatus,
  updateAvailability,
  getAvailableSlots,
  deleteService,
  getDashboardStats
}