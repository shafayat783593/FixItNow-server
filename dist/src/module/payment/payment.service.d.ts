import { BookingStatus, PaymentStatus, PaymentMethod } from "../../../generated/prisma/enums";
export declare const paymentService: {
    createCheckoutSession: (userId: string, bookingId: string) => Promise<{
        paymentUrl: string | null;
    }>;
    handelWebhook: (payload: Buffer, signature: string) => Promise<void>;
    getMyPayments: (customerId: string) => Promise<({
        booking: {
            service: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                technicianId: string;
                title: string;
                description: string | null;
                price: number;
                duration: number | null;
                categoryId: string;
            };
        } & {
            id: string;
            status: BookingStatus;
            createdAt: Date;
            updatedAt: Date;
            customerId: string;
            technicianId: string;
            serviceId: string;
            scheduledAt: Date;
            address: string | null;
            notes: string | null;
        };
    } & {
        id: string;
        status: PaymentStatus;
        createdAt: Date;
        updatedAt: Date;
        bookingId: string;
        transactionId: string;
        amount: number;
        method: PaymentMethod;
        provider: string | null;
        paidAt: Date | null;
    })[]>;
    getPaymentById: (paymentId: string, userId: string) => Promise<{
        booking: {
            service: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                technicianId: string;
                title: string;
                description: string | null;
                price: number;
                duration: number | null;
                categoryId: string;
            };
            technician: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                rating: number;
                userId: string;
                bio: string | null;
                experience: number | null;
                location: string | null;
                totalReviews: number;
            };
        } & {
            id: string;
            status: BookingStatus;
            createdAt: Date;
            updatedAt: Date;
            customerId: string;
            technicianId: string;
            serviceId: string;
            scheduledAt: Date;
            address: string | null;
            notes: string | null;
        };
    } & {
        id: string;
        status: PaymentStatus;
        createdAt: Date;
        updatedAt: Date;
        bookingId: string;
        transactionId: string;
        amount: number;
        method: PaymentMethod;
        provider: string | null;
        paidAt: Date | null;
    }>;
};
//# sourceMappingURL=payment.service.d.ts.map