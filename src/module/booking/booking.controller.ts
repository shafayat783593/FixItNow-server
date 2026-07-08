import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/cashAsync"
import { bookingService } from "./booking.service"
import { send } from "node:process"
import { sendResponse } from "../../utils/sendResponse"

import statusCode from "http-status"
import { Sign } from "node:crypto"


const createBooking = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const customerId = req.user?.id
    const payload = req.body
    const result = await bookingService.createBooking(customerId as string, payload)
    sendResponse(res, {
        success: true,
        statusCode: statusCode.OK,
        message: "Booking create successfully ",
        data: result
    })

})
const getMyBookings = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const customerId = req.user?.id
    const result = await bookingService.getMyBookings(customerId as string)
    sendResponse(res, {
        success: true,
        statusCode: statusCode.OK,
        message: "Booking create successfully ",
        data: result
    })

})
const getBookingById =catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const bookingId = req.params.id
    const result = await bookingService.getBookingById(bookingId as string)
    sendResponse(res, {
        success: true,
        statusCode: statusCode.OK,
        message: "Booking create successfully ",
        data: result
    })

})



const cancelBooking = catchAsync(async (req: Request, res: Response, next: NextFunction) => {


    sendResponse(res, {
        success: true,
        statusCode: statusCode.OK,
        message: "Booking create successfully ",
        data: result
    })

})


export const bookingController = {
    createBooking,
    getMyBookings,
    getBookingById,
    cancelBooking,
    
}