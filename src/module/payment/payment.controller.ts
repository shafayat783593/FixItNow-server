import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/cashAsync";
import { paymentService } from "./payment.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status"
const createCheckoutSession = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { bookingId } = req.body;

  const result = await paymentService.createCheckoutSession(userId as string, bookingId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Checkout session created successfully",
    data: result,
  });
});


export const paymentController = {
  createCheckoutSession,

};