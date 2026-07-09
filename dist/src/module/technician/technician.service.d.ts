import { BookingStatus, Role } from "../../../generated/prisma/client";
import { IAvailabilitySlot, ITechnicianQuery, ITechnicianUpdate } from "./technician.interface";
export declare const technicianService: {
    getAllTechnicians: (query: ITechnicianQuery) => Promise<{
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            rating: number;
            userId: string;
            bio: string | null;
            experience: number | null;
            location: string | null;
            totalReviews: number;
        }[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    getTechnicianById: (id: string) => Promise<{
        reviews: {
            id: string;
            createdAt: Date;
            customerId: string;
            technicianId: string;
            bookingId: string;
            rating: number;
            comment: string | null;
        }[];
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
    }>;
    updateTechnicianProfile: (id: string, updateData: ITechnicianUpdate) => Promise<({
        user: {
            name: string;
            id: string;
            email: string;
            phone: string | null;
            role: Role;
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
    }) | null>;
    getTechnicianBooking: (tecId: string) => Promise<({
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
            phone: string | null;
            role: Role;
            status: import("../../../generated/prisma/enums").UserStatus;
            createdAt: Date;
            updatedAt: Date;
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
    updateTechnicianBookingStatus: (userId: string, bookingId: string, action: BookingStatus) => Promise<{
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
    updateAvailability: (userId: string, slots: IAvailabilitySlot[]) => Promise<{
        id: string;
        technicianId: string;
        dayOfWeek: number;
        startTime: string;
        endTime: string;
        isAvailable: boolean;
    }[]>;
};
//# sourceMappingURL=technician.service.d.ts.map