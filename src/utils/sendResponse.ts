import { Response } from "express";

type TMeta ={
        page: number,
        limit: number,
        total:number
    }

type TResponseData <T>={
    success: boolean,
    message: string,
      statusCode: number,
    data: T
    meta?:TMeta
}



 export const  sendResponse = <T>(res: Response, data:TResponseData<T>) => {
    res.status(data.statusCode).json({
        success: data.success,
        message: data.message,
        statusCode: data.statusCode,
        data: data.data,
        meta:data.meta

    })
}

