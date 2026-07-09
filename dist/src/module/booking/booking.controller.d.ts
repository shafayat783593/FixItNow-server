import { NextFunction, Request, Response } from "express";
export declare const bookingController: {
    createBooking: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getMyBookings: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getBookingById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    cancelBooking: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};
//# sourceMappingURL=booking.controller.d.ts.map