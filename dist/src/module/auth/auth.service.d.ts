import { ILogin, RegisterUserPayload } from "./auth.interface";
import { Role } from "../../../generated/prisma/enums";
export declare const authService: {
    userRegisterInDB: (payload: RegisterUserPayload) => Promise<({
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
        phone: string | null;
        role: Role;
        status: import("../../../generated/prisma/enums").UserStatus;
        createdAt: Date;
        updatedAt: Date;
    }) | null>;
    userLoginInDB: (payload: ILogin) => Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    refreshTokenSave: (token: string) => Promise<{
        accessToken: string;
    }>;
    getCurrentLoginUser: (userId: string) => Promise<{
        bookingsAsCustomer: {
            id: string;
            status: import("../../../generated/prisma/enums").BookingStatus;
            createdAt: Date;
            updatedAt: Date;
            customerId: string;
            technicianId: string;
            serviceId: string;
            scheduledAt: Date;
            address: string | null;
            notes: string | null;
        }[];
        reviews: {
            id: string;
            createdAt: Date;
            customerId: string;
            technicianId: string;
            bookingId: string;
            rating: number;
            comment: string | null;
        }[];
        name: string;
        id: string;
        email: string;
        password: string;
        phone: string | null;
        role: Role;
        status: import("../../../generated/prisma/enums").UserStatus;
        createdAt: Date;
        updatedAt: Date;
    }>;
};
//# sourceMappingURL=auth.service.d.ts.map