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



export const technicianController = {
    getAllTechnicians,
    getTechnicianById,
    updateTechnicianProfile
}