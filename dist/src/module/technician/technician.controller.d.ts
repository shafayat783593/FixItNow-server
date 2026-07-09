import { NextFunction, Request, Response } from "express";
export declare const technicianController: {
    getAllTechnicians: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getTechnicianById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateTechnicianProfile: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getTechnicianBooking: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateBookingStatus: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateAvailability: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};
//# sourceMappingURL=technician.controller.d.ts.map