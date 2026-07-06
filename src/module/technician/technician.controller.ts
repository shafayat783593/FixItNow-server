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

export const technicianController = {
    getAllTechnicians,
}