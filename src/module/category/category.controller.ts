import { NextFunction,  Request, Response } from "express";
import { catchAsync } from "../../utils/cashAsync";
import { prisma } from "../../lib/prisma";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status"
import { categoryService } from "./category.service";

const createCategories = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {name,descriptin} = req.body
    const result = await categoryService.createCategories(name,descriptin)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Create ategories successfully",
        data:result
    })
    
})

export const categoryController = {
    createCategories,

}