import { BookingStatus } from "../../../generated/prisma/enums";
import { IBooking } from "./booking.interface";
export declare const bookingService: {
    createBooking: (customerId: string, payload: IBooking) => Promise<{
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
    }>;
    getMyBookings: (customerId: string) => Promise<({
        payment: {
            id: string;
            status: import("../../../generated/prisma/enums").PaymentStatus;
            createdAt: Date;
            updatedAt: Date;
            bookingId: string;
            transactionId: string;
            amount: number;
            method: import("../../../generated/prisma/enums").PaymentMethod;
            provider: string | null;
            paidAt: Date | null;
        } | null;
        service: {
            category: {
                name: string;
                id: string;
                createdAt: Date;
                description: string | null;
            };
        } & {
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
    })[]>;
    getBookingById: (bookingId: string) => Promise<({
        payment: {
            id: string;
            status: import("../../../generated/prisma/enums").PaymentStatus;
            createdAt: Date;
            updatedAt: Date;
            bookingId: string;
            transactionId: string;
            amount: number;
            method: import("../../../generated/prisma/enums").PaymentMethod;
            provider: string | null;
            paidAt: Date | null;
        } | null;
        review: {
            id: string;
            createdAt: Date;
            customerId: string;
            technicianId: string;
            bookingId: string;
            rating: number;
            comment: string | null;
        } | null;
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
        customer: {
            name: string;
            id: string;
            email: string;
            password: string;
            phone: string | null;
            role: import("../../../generated/prisma/enums").Role;
            status: import("../../../generated/prisma/enums").UserStatus;
            createdAt: Date;
            updatedAt: Date;
        };
        technician: {
            user: {
                name: string;
                id: string;
                email: string;
                password: string;
                phone: string | null;
                role: import("../../../generated/prisma/enums").Role;
                status: import("../../../generated/prisma/enums").UserStatus;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
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
    }) | null>;
    cancelBooking: (bookingId: string, customerId: string) => Promise<{
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
    }>;
};
//# sourceMappingURL=booking.service.d.ts.map