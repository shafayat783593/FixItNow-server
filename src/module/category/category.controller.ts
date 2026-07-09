import { NextFunction,  Request, Response } from "express";
import { catchAsync } from "../../utils/cashAsync";
import { prisma } from "../../lib/prisma";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status"
import { categoryService } from "./category.service";

const createCategories = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {name, description} = req.body
    const result = await categoryService.createCategories(name,description)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Create ategories successfully",
        data:result
    })
    
})

const getAllCategories = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query
    const result = await categoryService.getAllCategories(query)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Categories retrieved successfully",
        data: result
    })
})

export const categoryController = {
    createCategories,
    getAllCategories
}