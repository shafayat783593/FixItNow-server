import { NextFunction, Request, Response } from "express";
export declare const paymentController: {
    createCheckoutSession: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    handelWebhook: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getMyPayments: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getPaymentById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};
//# sourceMappingURL=payment.controller.d.ts.map