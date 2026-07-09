import { BookingStatus, Role, UserStatus } from "../../../generated/prisma/client";
import { IBookingQuery, IUpdateUser, IUser } from "./admin.interface";
export declare const adminService: {
    getAllUser: (query: IUser) => Promise<{
        data: ({
            technicianProfile: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                rating: number;
                userId: string;
                bio: string | null;
                experience: number | null;
                location: string | null;
                totalReviews: number;
            } | null;
        } & {
            name: string;
            id: string;
            email: string;
            password: string;
            phone: string | null;
            role: Role;
            status: UserStatus;
            createdAt: Date;
            updatedAt: Date;
        })[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    updateUser: (id: string, payload: IUpdateUser) => Promise<{
        technicianProfile: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            rating: number;
            userId: string;
            bio: string | null;
            experience: number | null;
            location: string | null;
            totalReviews: number;
        } | null;
    } & {
        name: string;
        id: string;
        email: string;
        password: string;
        phone: string | null;
        role: Role;
        status: UserStatus;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getAllBookings: (query: IBookingQuery) => Promise<{
        data: ({
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
            customer: {
                name: string;
                id: string;
                email: string;
                phone: string | null;
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
        })[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
};
//# sourceMappingURL=admin.service.d.ts.map