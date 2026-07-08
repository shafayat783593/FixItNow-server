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

const handelWebhook = catchAsync(async (req: Request, res: Response,next:NextFunction) => {
  const event = req.body as Buffer;
    const signature = req.headers["stripe-signature"];

  await paymentService.handelWebhook(event, signature as string);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Webhook tiggered successfully",
    data: null,
  });
});

const getMyPayments = catchAsync(async (req: Request, res: Response) => {
  const payments = await paymentService.getMyPayments(req.user?.id as string);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Payments retrieved successfully",
    data: payments,
  });
});

const getPaymentById = catchAsync(async (req: Request, res: Response) => {
  const payment = await paymentService.getPaymentById(req.params.id, req.user?.id as string);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Payment retrieved successfully",
    data: payment,
  });
});

export const paymentController = {
  createCheckoutSession,
  handelWebhook,
  getMyPayments,
  getPaymentById,
};